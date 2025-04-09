const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const monthlyPaymentSchema = new Schema(
  {
    _id: { type: Number },
    hotel: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Hotel', 
      required: true 
    },
    month: { 
      type: Number, 
      required: true 
    },
    year: { 
      type: Number, 
      required: true,
      default: new Date().getFullYear()
    },
    amount: { 
      type: Number, 
      required: true,
      default: 0
    },
    status: { 
      type: String, 
      enum: ['PENDING', 'PAID'], 
      default: 'PENDING' 
    },
    paymentDate: {
      type: Date,
      default: null
    }
  },
  { timestamps: true, versionKey: false }
);

// Thêm plugin auto-increment cho _id
monthlyPaymentSchema.plugin(AutoIncrement, {
  id: 'monthly_payment_seq',
  inc_field: '_id',
});

module.exports = mongoose.model('MonthlyPayment', monthlyPaymentSchema);
