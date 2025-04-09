const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const RoomFacilitySchema = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
  },
  { versionKey: false }
);

// Thêm auto-increment
RoomFacilitySchema.plugin(AutoIncrement, {
  id: "room_facility_seq", // tên chuỗi định danh sequence
  inc_field: "_id",
});

module.exports = mongoose.model("RoomFacility", RoomFacilitySchema);
