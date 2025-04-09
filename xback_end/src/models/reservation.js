const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    _id: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    rooms: [
      {
        _id: false,
        room: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "BOOKED",
        "CHECKED IN",
        "CHECKED OUT",
        "COMPLETED",
        "PENDING",
        "CANCELLED",
        "NOT PAID",
      ],
      default: "PENDING",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

// Thêm plugin auto-increment cho _id
reservationSchema.plugin(AutoIncrement, {
  id: "reservation_seq",
  inc_field: "_id",
});

module.exports = mongoose.model("Reservation", reservationSchema);
