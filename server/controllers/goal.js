const GoalSchema = require('../models/GoalModel');

exports.addGoal = async (req, res) => {
  const { plan, amount, monthly } = req.body;

  const goal = GoalSchema({
    plan,
    amount,
    monthly,
  });

  try {
    // if (!plan || !amount || !monthly) {
    //   return res.status(400).json({ message: 'All fields are required!' });
    // }
    // if (amount <= 0 || !amount === 'number') {
    //   return res.status(400).json({ message: 'Amount must be a positive' });
    // }
    await goal.save();
    res.status(200).json({ message: 'Goal Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
  console.log(goal);
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await GoalSchema.find().sort({ createedAt: -1 });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
