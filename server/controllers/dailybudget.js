const DailyBudgetSchema = require('../models/DailyBudgetModel');

exports.addDailyBudget = async (req, res) => {
  const { dailybudget } = req.body;
  const dailyBudget = DailyBudgetSchema({
    dailybudget,
  });

  try {
    await dailyBudget.save();
    res.status(200).json({ message: 'DailyBudget Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
  console.log(dailyBudget);
};

exports.getDailyBudget = async (req, res) => {
  try {
    const dailyBudgets = await DailyBudgetSchema.find().sort({
      createedAt: -1,
    });
    res.status(200).json(dailyBudgets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
