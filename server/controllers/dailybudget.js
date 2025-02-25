const DailyBudgetSchema = require('../models/DailyBudgetModel');

exports.addDailyBudget = async (req, res) => {
  const { dailybudget, monthlybudget } = req.body;

  try {
    let dailyBudgets = await DailyBudgetSchema.findOne(); // ใช้ let เพื่อให้กำหนดค่าใหม่ได้

    if (dailyBudgets || monthlybudget) {
      dailyBudgets.dailybudget = dailybudget; // แก้ไขค่าแทนการสร้างใหม่
      dailyBudgets.monthlybudget = monthlybudget; // แก้ไขค่าแทนการสร้างใหม่
      await dailyBudgets.save();
      return res.json({ message: 'อัปเดตข้อมูลสำเร็จ', dailyBudgets });
    } else {
      dailyBudgets = new DailyBudgetSchema({ dailybudget });
      await dailyBudgets.save();
      return res
        .status(201)
        .json({ message: 'เพิ่มข้อมูลสำเร็จ', dailyBudgets });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getDailyBudget = async (req, res) => {
  try {
    const dailyBudgets = await DailyBudgetSchema.findOne();
    res.status(200).json(dailyBudgets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
