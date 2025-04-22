const Room = require("../../models/room");
const Hotel = require("../../models/hotel");
const RoomFacility = require("../../models/roomFacility");
const Bed = require("../../models/bed");
const reservation = require("../../models/reservation");

const getRoomsByHotel = async (req, res) => {
  const { hotelId } = req.params;
  const { checkInDate, checkOutDate, page = 1, limit = 10 } = req.query;

  // Validate inputs
  if (!hotelId || !checkInDate || !checkOutDate) {
    return res.status(400).json({
      error: true,
      message:
        "Missing required fields (hotelId, checkInDate, or checkOutDate).",
    });
  }
  try {
    const selectedCheckIn = new Date(checkInDate);
    const selectedCheckOut = new Date(checkOutDate);
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch overlapping reservations
    const overlappingReservations = await reservation
      .find({
        hotel: hotelId,
        status: { $nin: ["CANCELLED", "COMPLETED"] },
        $and: [
          { checkInDate: { $lt: selectedCheckOut } },
          { checkOutDate: { $gt: selectedCheckIn } },
        ],
      })
      .populate("rooms.room");

    // Get all rooms for this hotel
    const allRooms = await Room.find({ hotel: hotelId });

    // Calculate total booked quantity per room
    const roomBookedQuantities = {};
    overlappingReservations.forEach((res) => {
      res.rooms.forEach((roomItem) => {
        const roomId = roomItem.room._id.toString();
        const quantity = roomItem.quantity;
        roomBookedQuantities[roomId] =
          (roomBookedQuantities[roomId] || 0) + quantity;
      });
    });

    // Determine available rooms with remaining quantity
    const availableRooms = allRooms
      .map((room) => {
        const booked = roomBookedQuantities[room._id.toString()] || 0;
        const available = room.quantity - booked;
        return {
          ...room.toObject(),
          availableQuantity: available,
        };
      })
      .filter((room) => room.availableQuantity > 0);

    // Apply pagination
    const paginatedRooms = availableRooms.slice(skip, skip + limitNumber);
    const totalRooms = availableRooms.length;
    const totalPages = Math.ceil(totalRooms / limitNumber);

    return res.status(200).json({
      error: false,
      message: "Rooms fetched successfully",
      rooms: paginatedRooms,
      totalRooms,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Error fetching room availability:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
const getRoomById = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId)
      .populate("hotel")
      .populate("facilities")
      .populate("bed.bed", "bedType capacity name");
  

    if (!room) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy phòng với ID đã cung cấp." });
    }

    res.status(200).json({ room });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin phòng:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy thông tin phòng." });
  }
};
module.exports = {
  getRoomsByHotel,
  getRoomById,
};
