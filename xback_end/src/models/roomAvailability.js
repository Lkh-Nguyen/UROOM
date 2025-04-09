const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const RoomAvailabilitySchema = new mongoose.Schema(
  {
    _id: { type: Number },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    date: { type: Date, required: true },
    bookedQuantity: { type: Number, default: 0 },
  },
  { versionKey: false }
);

// Tự động tăng _id
RoomAvailabilitySchema.plugin(AutoIncrement, {
  id: "room_availability_seq",
  inc_field: "_id",
});

module.exports = mongoose.model("RoomAvailability", RoomAvailabilitySchema);
