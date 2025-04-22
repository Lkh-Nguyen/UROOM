const Reservation = require("../../models/reservation");

exports.getReservationsByUserId = async (req, res) => {
  try {
    const userId = Number(req.user._id); 

    const reservations = await Reservation.find({ user: userId })
      .populate("hotel")
      .populate("rooms.room") 
      .sort({ createdAt: -1 });

    if (reservations.length === 0) {
      return res.status(404).json({
        error: true,
        message: "Bạn chưa có đơn đặt phòng nào.",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Lấy danh sách đơn đặt phòng thành công.",
      data: reservations,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đặt phòng theo user:", error);
    return res.status(500).json({
      error: true,
      message: "Lỗi server khi lấy danh sách đặt phòng người dùng.",
    });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservationId = req.params.id;

    const reservation = await Reservation.findById(reservationId)
      .populate("hotel")
      .populate("rooms.room");

    if (!reservation) {
      return res.status(404).json({
        error: true,
        message: "Không tìm thấy đơn đặt phòng.",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Lấy thông tin đơn đặt phòng thành công.",
      data: reservation,
    });
  } catch (error) {
    console.error("Lỗi khi lấy đơn đặt phòng theo ID:", error);
    return res.status(500).json({
      error: true,
      message: "Lỗi server khi lấy thông tin đơn đặt phòng.",
    });
  }
};
