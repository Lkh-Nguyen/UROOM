const asyncHandler = require("../../middlewares/asyncHandler");
const Reservation = require("../../models/reservation");
const cron = require("node-cron");

exports.getReservationDetailById = asyncHandler(async (req, res) => {
  const { reservationId } = req.params;

  if (!reservationId) {
    return res.status(400).json({
      message: RESERVATION.INVALID_STATUS,
    });
  }

  try {
    const reservation = await Reservation.findById(reservationId)
      .populate("user", "name email phoneNumber") // Chỉ lấy các trường cần thiết
      .populate("hotel", "hotelName address rating star pricePerNight") // Chỉ lấy các trường cần thiết
      .populate("rooms.room", "name type price"); // Populate chi tiết phòng đặt

    if (!reservation) {
      return res.status(404).json({ message: RESERVATION.NOT_FOUND });
    }

    return res.status(200).json({
      reservation,
      message: "Get detail reservation successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});


const autoUpdateNotPaidReservation = asyncHandler(async () => {
  const reservations = await Reservation.find({ status: "NOT PAID" });

  const now = new Date();

  for (const r of reservations) {
    const createdAt = new Date(r.createdAt); // assuming you have timestamps enabled
    const diffInMinutes = (now - createdAt) / (1000 * 60); // convert ms to minutes

    if (diffInMinutes >= 5 && r.status === "NOT PAID") {
      r.status = "CANCELLED";
      await r.save();
      console.log(`Reservation ${r._id} đã bị hủy do quá 10 phút chưa thanh toán.`);
    }
  }
});

// setinterval auto run after each minutes
cron.schedule(
  "*/5 * * * *",
  () => {
    // autoUpdateReservationStatus();
    autoUpdateNotPaidReservation();
    console.log(`Đã xóa not paid reservation sau 5 phút`);
  },
  {
    timezone: "Asia/Ho_Chi_Minh",
  }
);