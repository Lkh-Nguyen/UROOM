const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const HotelFacilitySchema = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
  },
  { versionKey: false }
);

// Thêm plugin auto-increment cho _id
HotelFacilitySchema.plugin(AutoIncrement, {
  id: "hotel_facility_seq",
  inc_field: "_id",
});

module.exports = mongoose.model("HotelFacility", HotelFacilitySchema);
