const DailyBudgetSchema = require('../models/DailyBudgetModel');

exports.addDailyBudget = async (req, res) => {
  const { dailybudget } = req.body;
  const dailyBudget = DailyBudgetSchema({
    dailybudget,
  });

  try {
    let data = await DailyBudgetSchema.findOne();
    if (data) {
      data.value = value;
      await data.save();
      return res.json({ message: 'อัปเดตข้อมูลสำเร็จ', data });
    } else {
      data = new DailyBudgetSchema({ value });
      await data.save();
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
