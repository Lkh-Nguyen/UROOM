const Room = require('../../models/room');
const Hotel = require('../../models/hotel');
const RoomFacility = require('../../models/roomFacility');
const Bed = require('../../models/bed');

const getRoomsByHotel = async (req, res) => {
  const { hotelId } = req.params;

  try {
    const rooms = await Room.find({ hotel: hotelId })
      .populate('hotel', 'name location') 
      .populate('facilities', 'facilityName') 
      .populate('bed.bed', 'bedType capacity');  
      console.log("rooms: ", rooms)
    res.status(200).json({rooms});
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phòng theo khách sạn:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy phòng của khách sạn.' });
  }
};

module.exports = {
  getRoomsByHotel,
};
