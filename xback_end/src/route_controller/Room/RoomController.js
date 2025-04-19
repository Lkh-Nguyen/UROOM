const Room = require("../../models/room");
const Hotel = require("../../models/hotel");
const RoomFacility = require("../../models/roomFacility");
const Bed = require("../../models/bed");

const getRoomsByHotel = async (req, res) => {
  const { hotelId } = req.params;

  try {
    const rooms = await Room.find({ hotel: hotelId })
      .populate("hotel", "name location")
      .populate("facilities")
      .populate("bed.bed", "bedType capacity");
    console.log("rooms: ", rooms);
    res.status(200).json({ rooms });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng theo khách sạn:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy phòng của khách sạn." });
  }
};

const getRoomById = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId)
      .populate("hotel")
      .populate('facilities', 'name icon')
      .populate("bed", "bedType capacity name")
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
