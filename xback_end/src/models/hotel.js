const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const hotelSchema = new Schema(
  {
    hotelName: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HotelService",
      },
    ],
    facilities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HotelFacility",
      },
    ],
    rating: {
      type: Number,
      required: true,
    },
    star: {
      type: Number,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    images: [
      { type: String, required: true },
    ],
    businessDocuments: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true }
      }
    ],
    adminStatus: {
      type: String,
      enum: ["PENDING", "APPROVED"],
      default: "PENDING"
    },
    ownerStatus: {
      type: String,
      enum: ["ACTIVE", "NONACTIVE"],
      default: "ACTIVE"
    },
    requestDate: {
      type: Date,
      default: Date.now
    },
    decisionDate: {
      type: Date
    }
  },
  { versionKey: false }
);



module.exports = mongoose.model("Hotel", hotelSchema);
