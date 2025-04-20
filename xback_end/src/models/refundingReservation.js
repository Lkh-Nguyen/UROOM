const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const refundingReservationSchema = new Schema(
  {
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



module.exports = mongoose.model('RefundingReservation', refundingReservationSchema);
