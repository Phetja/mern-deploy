const mongoose = require('mongoose');

const DailyBudgetSchema = new mongoose.Schema(
  {
    dailybudget: Number,
    monthlybudget: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('DailyBudget', DailyBudgetSchema);
