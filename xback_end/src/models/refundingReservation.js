const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const refundingReservationSchema = new Schema(
  {
    _id: { type: Number },
    reservation: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Reservation', 
      required: true 
    },
    refundAmount: { 
      type: Number, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['PENDING', 'APPROVED'], 
      default: 'PENDING' 
    },
    requestDate: { 
      type: Date, 
      default: Date.now 
    },
    decisionDate: { 
      type: Date,
      default: null
    }
  },
  { timestamps: true, versionKey: false }
);

// Thêm plugin auto-increment
refundingReservationSchema.plugin(AutoIncrement, {
  id: 'refunding_reservation_seq',
  inc_field: '_id',
});

module.exports = mongoose.model('RefundingReservation', refundingReservationSchema);
