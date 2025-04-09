const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    _id: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID
    reservation: {
      type: Schema.Types.ObjectId,
      ref: "Reservation", // sửa đúng ref là "Reservation"
      required: true,
    }, // Reservation ID
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    }, // Hotel ID
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// Tích hợp AutoIncrement plugin
FeedbackSchema.plugin(AutoIncrement, {
  id: "feedback_seq", // tên sequence
  inc_field: "_id",   // trường cần tăng
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
