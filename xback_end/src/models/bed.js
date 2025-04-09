const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const bedSchema = new mongoose.Schema(
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
  },
  { versionKey: false }
);

// Thêm auto-increment plugin
bedSchema.plugin(AutoIncrement, {
  id: "bed_seq",       // Tên của sequence
  inc_field: "_id",    // Trường cần auto-increment
});

module.exports = mongoose.model("Bed", bedSchema);