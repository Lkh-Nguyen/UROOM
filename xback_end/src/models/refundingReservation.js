const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const refundingReservationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.Number,
      ref: "User",
      required: true,
    },
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    refundAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["WAITING_FOR_BANK_INFO", "PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    reason: {
      type: String,
      default: null
    },
    accountHolderName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    bankName: {
      type: String,
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    decisionDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model(
  "RefundingReservation",
  refundingReservationSchema
);
