
const Hotel = require("../../models/hotel");
const User = require("../../models/user");
const asyncHandler = require("../../middlewares/asyncHandler");
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
  const { ids } = req.body; 

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({
      error: true,
      message: "No hotel ids provided or invalid format",
    });
  }

  const hotels = await Hotel.find({ _id: { $in: ids } })
    .populate("services")
    .populate("facilities");
  
  return res.status(200).json({
    error: false,
    hotels,
    message: "Get favorite hotels success",
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

  return res.status(200).json({
    error: false,
    hotel,
    message: "Get hotel details success",
  });
});







