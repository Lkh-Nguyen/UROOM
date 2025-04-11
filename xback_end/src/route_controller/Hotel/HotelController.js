
const Hotel = require("../../models/hotel");
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








