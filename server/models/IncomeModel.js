const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), 'Asia/Bangkok');

const IncomeSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    type: {
      type: String,
      default: 'income',
    },
    date: {
      type: String,
      required: true,
      // trim: true,
    },

    // description: {
    //   type: String,
    //   required: true,
    //   maxLength: 20,
    //   trim: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Income', IncomeSchema);
