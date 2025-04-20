const Hotel = require("../../models/hotel");
const User = require("../../models/user");
const asyncHandler = require("../../middlewares/asyncHandler");
const { calculateAvgRatingHotel } = require("../Feedback/FeedbackController");
require("../../models/hotelFacility");

// exports.getAllHotels = asyncHandler(async (req, res) => {
//     const {page= 1, limit= 5}= req.query;

//     const query = {};

//     // 📄 Pagination
//     const pageNum = parseInt(page);
//     const limitNum = parseInt(limit);
//     const skip = (pageNum - 1) * limitNum;

//     const hotels = await Hotel.find()
//         .skip(skip)
//         .limit(limitNum)
//         .populate("services")
//         .populate("facilities");

//   if (hotels.length === 0) {
//     return res.status(404).json({
//       error: true,
//       message: "No hotels found",
//     });
//   }

//   return res.status(200).json({
//     error: false,
//     hotels,
//     message: "Get all hotels success",
//   });
// });

exports.getAllHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find().populate("services").populate("facilities");

  if (hotels.length === 0) {
    return res.status(404).json({
      error: true,
      message: "No hotels found",
    });
  }

  return res.status(200).json({
    error: false,
    hotels,
    message: "Get all hotels success",
  });
});

exports.getHotelsByIds = asyncHandler(async (req, res) => {
  const { ids, params } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({
      error: true,
      message: "No hotel ids provided or invalid format",
    });
  }

  const { star, address, district } = params || {};

  // Khởi tạo query cơ bản với điều kiện lọc theo ids
  let query = {
    _id: { $in: ids },
  };

  // Thêm điều kiện lọc theo sao
  if (star) {
    if (star === "0") {
      // Không lọc theo star
    } else if (/^\d$/.test(star) && Number(star) >= 1 && Number(star) <= 5) {
      // Nếu star là một số từ 1 đến 5
      query.star = Number(star);
    }
  }

  // Thêm điều kiện $and nếu có address hoặc district
  const andConditions = [];

  if (address) {
    andConditions.push({ address: { $regex: address, $options: "i" } });
  }

  if (district) {
    andConditions.push({ address: { $regex: district, $options: "i" } });
  }

  if (andConditions.length > 0) {
    query.$and = andConditions;
  }

  // Tìm kiếm theo query đã build
  const listHotels = await Hotel.find(query)
    .populate("services")
    .populate("facilities");

    console.log("hotel: ", listHotels)
  // Tính trung bình rating
  const finalHotelTemps = await Promise.all(
    listHotels.map(async (hotel) => {
      const { avgValueRating, totalFeedbacks } = await calculateAvgRatingHotel(
        hotel._id
      );
      return {
        avgValueRating,
        totalFeedbacks,
        hotel,
      };
    })
  );

  return res.status(200).json({
    error: false,
    hotels: finalHotelTemps,
    message: "Get filtered hotels success",
  });
});

exports.removeFavoriteHotel = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Lấy từ token
  const { hotelId } = req.body;

  if (!userId || !hotelId) {
    return res.status(400).json({
      error: true,
      message: "Missing userId or hotelId",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User not found",
    });
  }

  user.favorites = user.favorites.filter(
    (favId) => favId.toString() !== hotelId
  );

  await user.save();

  return res.status(200).json({
    error: false,
    message: "Removed hotel from favorites successfully",
    favorites: user.favorites,
  });
});

exports.addFavoriteHotel = asyncHandler(async (req, res) => {
  const userId = req.user._id; // lấy từ token
  const { hotelId } = req.body;

  if (!hotelId) {
    return res.status(400).json({
      error: true,
      message: "Missing hotelId",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User not found",
    });
  }

  const hotelExists = await Hotel.findById(hotelId);
  if (!hotelExists) {
    return res.status(404).json({
      error: true,
      message: "Hotel not found",
    });
  }

  if (user.favorites.includes(hotelId)) {
    return res.status(409).json({
      error: true,
      message: "Hotel is already in favorites",
    });
  }

  user.favorites.push(hotelId);
  await user.save();

  return res.status(200).json({
    error: false,
    message: "Added hotel to favorites successfully",
    favorites: user.favorites,
  });
});

exports.getHotelDetails = asyncHandler(async (req, res) => {
  const { hotelId } = req.params;
  let user = null;
  if (req.user && req.user._id) {
    user = await User.findById(req.user._id);
    if (!user) {
      console.warn("User from token not found, proceeding without user.");
    }
  }

  if (!hotelId) {
    return res.status(400).json({
      error: true,
      message: "Hotel ID is required",
    });
  }

  const hotel = await Hotel.findById(hotelId)
    .populate("services")
    .populate("facilities");

  if (!hotel) {
    return res.status(404).json({
      error: true,
      message: "Hotel not found",
    });
  }
  let isFavorite= false;
  if(user){
    isFavorite = user
    ? user.favorites.includes(hotel._id.toString())
    : false;
  }

  return res.status(200).json({
    error: false,
    isFavorite,
    hotel,
    message: "Get hotel details success",
  });
});
