const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const HotelServiceSchema = new Schema(
  {
    _id: { type: Number },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

// Thêm plugin auto-increment cho _id
HotelServiceSchema.plugin(AutoIncrement, {
  id: "hotel_service_seq",
  inc_field: "_id",
});

module.exports = mongoose.model("HotelService", HotelServiceSchema);
