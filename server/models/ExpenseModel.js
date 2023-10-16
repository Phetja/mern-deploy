const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
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
      default: 'expense',
    },
    date: {
      type: String,
      required: true,
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

module.exports = mongoose.model('Expense', ExpenseSchema);
