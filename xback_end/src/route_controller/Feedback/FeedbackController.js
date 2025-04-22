const Feedback = require("../../models/feedback");
const Reservation = require("../../models/reservation");
const Hotel = require("../../models/hotel");
const asyncHandler = require("../../middlewares/asyncHandler");
const { FEEDBACK } = require("../../utils/constantMessage");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../../models/user");
exports.calculateAvgRatingHotel = async (hotelId) => {
  // Sử dụng aggregate để tính trung bình rating và tổng số feedback
  const result = await Feedback.aggregate([
    { $match: { hotel: hotelId } }, // Lọc feedback theo hotelId
    {
      $group: {
        _id: "$hotel",
        avgRating: { $avg: "$rating" }, // Tính trung bình rating
        totalFeedbacks: { $sum: 1 }, // Đếm số feedback
      },
    },
  ]);

  if (result.length === 0) {
    return { avgValueRating: 0, totalFeedbacks: 0 }; // Nếu không có feedback, trả về 0
  }

  const avgValueRating = Number(result[0].avgRating.toFixed(1));
  const totalFeedbacks = result[0].totalFeedbacks;

  return { avgValueRating, totalFeedbacks };
};

exports.getAllFeedBackByHotelId = asyncHandler(async (req, res) => {
  const { hotelId } = req.params;
  const { page = 1, limit = 3, sort = 1, star = 0 } = req.query;

  if (!hotelId) {
    return res
      .status(400)
      .json({ error: true, message: "Hotel ID is required" });
  }

  let query = { hotel: hotelId };

  // Lọc theo số sao nếu có
  if (star) {
    if (star === 0) {
      // Không lọc theo star
    } else if (/^\d$/.test(star) && Number(star) >= 1 && Number(star) <= 5) {
      query.rating = Number(star);
    }
  }

  // Sắp xếp
  let sortOption = {};
  if (sort == 0) {
    sortOption = { createdAt: -1 }; // mới nhất đến cũ nhất
  } else if (sort == 1) {
    sortOption = { createdAt: 1 }; // cũ nhất đến mới nhất
  } else if (sort == 2) {
    sortOption = { rating: -1 }; // rating cao đến thấp
  } else if (sort == 3) {
    sortOption = { rating: 1 }; // rating thấp đến cao
  }

  let listFeedback = [];
  let stats = [];
  let ratingCounts = [];

  try {
    listFeedback = await Feedback.find(query)
      .populate("user")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));
  } catch (err) {
    console.error("❌ Error when fetching listFeedback:", err);
    return res.status(500).json({
      error: true,
      message: "Error fetching feedback list",
      detail: err.message,
    });
  }

  try {
    stats = await Feedback.aggregate([
      { $match: { hotel: new mongoose.Types.ObjectId(hotelId) } },
      {
        $group: {
          _id: null,
          totalFeedback: { $sum: 1 },
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
  } catch (err) {
    console.error("❌ Error in aggregate stats:", err);
    return res.status(500).json({
      error: true,
      message: "Error aggregating feedback stats",
      detail: err.message,
    });
  }

  try {
    ratingCounts = await Feedback.aggregate([
      { $match: { hotel: new mongoose.Types.ObjectId(hotelId) } },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
    ]);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Error aggregating rating counts",
      detail: err.message,
    });
  }

  // Chuẩn hóa dữ liệu
  const feedbackStats = stats[0] || { totalFeedback: 0, averageRating: 0 };
  const ratingMap = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratingCounts.forEach((item) => {
    ratingMap[item._id] = item.count;
  });

  const totalFeedbackCount = await Feedback.countDocuments(query);

  return res.status(200).json({
    error: false,
    listFeedback,
    totalFeedback: feedbackStats.totalFeedback,
    averageRating: parseFloat(feedbackStats.averageRating?.toFixed(1)) || 0,
    ratingBreakdown: {
      oneStar: ratingMap[1],
      twoStar: ratingMap[2],
      threeStar: ratingMap[3],
      fourStar: ratingMap[4],
      fiveStar: ratingMap[5],
    },
    totalPages: Math.ceil(totalFeedbackCount / limit),
    currentPage: Number(page),
    message:
      listFeedback.length === 0
        ? "No feedback yet for this hotel"
        : "Get all feedback by hotel id success",
  });
});

exports.getFeedbackByUserId = async (req, res) => {
  try {
    const userId = Number(req.user._id); 

    const feedbacks = await Feedback.find({ user: userId }) 
      .populate("hotel")
      .populate("reservation", "checkIn checkOut")
      .sort({ createdAt: -1 });

    if (feedbacks.length === 0) {
      return res.status(404).json({
        error: true,
        message: "Bạn chưa viết feedback nào.",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Lấy danh sách feedback thành công",
      data: feedbacks,
    });
  } catch (error) {
    console.error("Lỗi khi lấy feedback theo user:", error);
    return res.status(500).json({
      error: true,
      message: "Lỗi server khi lấy feedback người dùng",
    });
  }
};
exports.updateFeedback = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const feedbackId = req.params.feedbackId;
    const { content, rating } = req.body;

    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ error: true, message: "Feedback không tồn tại." });
    }

    if (feedback.user !== userId) {
      return res.status(403).json({ error: true, message: "Bạn không có quyền sửa feedback này." });
    }

    feedback.content = content || feedback.content;
    feedback.rating = rating || feedback.rating;
    feedback.updatedAt = new Date();

    await feedback.save();

    return res.status(200).json({
      error: false,
      message: "Cập nhật feedback thành công",
      data: feedback,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật feedback:", error);
    return res.status(500).json({
      error: true,
      message: "Lỗi server khi cập nhật feedback",
    });
  }
};
exports.deleteFeedback = async (req, res) => {
  try {
    const userId = Number(req.user._id);
    const feedbackId = req.params.feedbackId;

    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ error: true, message: "Feedback không tồn tại." });
    }

    if (feedback.user !== userId) {
      return res.status(403).json({ error: true, message: "Bạn không có quyền xoá feedback này." });
    }

    await Feedback.findByIdAndDelete(feedbackId);

    return res.status(200).json({
      error: false,
      message: "Xoá feedback thành công",
    });
  } catch (error) {
    console.error("Lỗi khi xoá feedback:", error);
    return res.status(500).json({
      error: true,
      message: "Lỗi server khi xoá feedback",
    });
  }
};

