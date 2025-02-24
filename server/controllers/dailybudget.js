const DailyBudgetSchema = require('../models/DailyBudgetModel');

exports.addDailyBudget = async (req, res) => {
  const { dailybudget } = req.body;
  const dailyBudget = DailyBudgetSchema({
    dailybudget,
  });

  try {
    await dailyBudget.findOne();
    if (dailybudget) {
      dailybudget.value = value;
      await dailybudget.save();
      return res.json({ message: 'อัปเดตข้อมูลสำเร็จ', dailybudget });
    } else {
      dailybudget = new dailyBudget({ value });
      await dailyBudget.save();
      return res.status(201).json({ message: 'เพิ่มข้อมูลสำเร็จ', data });
    }
    // await dailyBudget.save();
    // res.status(200).json({ message: 'DailyBudget Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
  console.log(dailyBudget);
};

exports.getDailyBudget = async (req, res) => {
  try {
    const dailyBudgets = await DailyBudgetSchema.findOne();
    res.status(200).json(dailyBudgets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
