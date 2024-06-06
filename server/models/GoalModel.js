const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema(
  {
    plan: {
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
    monthly: {
      type: Number,
      required: true,
      maxLength: 10,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', GoalSchema);
