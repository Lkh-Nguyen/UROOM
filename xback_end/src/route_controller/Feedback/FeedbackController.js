const Feedback = require("../../models/feedback");
const Reservation = require("../../models/reservation");
const Hotel = require("../../models/hotel");
const asyncHandler = require("../../middlewares/asyncHandler");
const { FEEDBACK } = require("../../utils/constantMessage");
require("dotenv").config();

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
  
    const [listFeedback, userFeeback] = await Promise.all([
      Feedback.find({ hotel: hotelId }).populate("user").populate('hotel'),
      Feedback.find(
        { hotel: hotelId },
        {
          reservation: 0,
          hotel: 0,
          content: 0,
          rating: 0,
        }
      ).populate("user"),
    ]);
  
    if (!hotelId) {
      listFeedback = await Feedback.find();
    }
  
    if (listFeedback.length === 0) {
      return res.send("No have any feedback")
    }
  
    return res.status(200).json({
      error: false,
      listFeedback,
      userFeeback,
      message: "Get all feed by hotel id success",
    });
  });