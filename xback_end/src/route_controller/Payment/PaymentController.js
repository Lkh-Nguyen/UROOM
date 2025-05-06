require("dotenv").config();
const asyncHandler = require("../../middlewares/asyncHandler");
const User = require("../../models/user");
const Room = require("../../models/room");
const Reservation = require("../../models/reservation");
const RoomAvailability = require("../../models/roomAvailability");
const mongoose = require("mongoose");

//Create booking with not paid reservation
exports.createBooking = asyncHandler(async (req, res) => {
  const user = req.user;
  const { hotelId, checkInDate, checkOutDate, roomDetails, totalPrice } =
    req.body.params;


  try {
    if (!user._id || !hotelId || !checkInDate || !checkOutDate) {
      return res
        .status(400)
        .json({ error: true, message: "Missing required fields" });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    //Check not paid reservation
    const unpaidReservation = await Reservation.findOne({
      user: user._id,
      status: "NOT PAID",
    });

    console.log("unpaidReservation: ", unpaidReservation);

    if (unpaidReservation) {
      return res.json({
        unpaidReservation: unpaidReservation,
        message:
          "You must payment the not paid reservation before or wait 5 minutes to delete",
      });
    }

    // Tạo đơn đặt phòng
    const reservation = new Reservation({
      user: user._id,
      hotel: hotelId,
      rooms: roomDetails.map((item) => ({
        room: item.room._id,
        quantity: item.amount,
      })),
      checkInDate,
      checkOutDate,
      totalPrice,
      status: "NOT PAID",
    });

    reservation.save();

    console.log("reservation: ", reservation);
    return res.status(201).json({
      error: false,
      message: "Reservation created successfully. Please finish payment in 5 minutes",
      reservation,
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ error: true, message: "Failed to create reservation" });
  }
});

exports.cancelPayment = asyncHandler(async (req, res) => {
  const { reservationId } = req.body;
  console.log("reservationId1: ", reservationId);
  const userId = req.user.id;

  try {
    const reservation = await Reservation.findById(reservationId).populate(
      "hotel"
    );

    if (!reservation) {
      return res.status(404).json({
        error: true,
        message: "Reservation not found",
      });
    }

    // Kiểm tra nếu reservation đã bị hủy rồi
    if (reservation.status === "CANCELLED") {
      return res.status(400).json({
        error: true,
        message: "Reservation is already cancelled",
      });
    }

    if (reservation.status === "NOT PAID") {
      reservation.status = "CANCELLED";
      reservation.save();
    }

    return res.status(200).json({
      error: false,
      message: "Reservation cancelled successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Failed to cancel reservation",
    });
  }
});

exports.acceptPayment = asyncHandler(async (req, res) => {
  const { reservationId } = req.body;
  console.log("reservationId: ", reservationId);
  const userId = req.user.id;

  try {
    const reservation = await Reservation.findById(reservationId).populate(
      "hotel"
    );

    if (!reservation) {
      return res.status(404).json({
        error: true,
        message: "Reservation not found",
      });
    }

    // Kiểm tra nếu reservation đã bị hủy rồi
    if (reservation.status === "CANCELLED") {
      return res.status(400).json({
        error: true,
        message: "Reservation is already cancelled",
      });
    }

    if (reservation.status === "NOT PAID") {
      reservation.status = "PENDING";
      reservation.save();
    }

    return res.status(200).json({
      error: false,
      message: "Reservation cancelled successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Failed to cancel reservation",
    });
  }
});
