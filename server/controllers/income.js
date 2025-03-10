const IncomeSchema = require('../models/IncomeModel');

exports.addIncome = async (req, res) => {
  const { title, amount, category, date } = req.body;

  const income = IncomeSchema({
    title,
    amount,
    category,
    // description,
    date,
  });
  console.log(date);
  try {
    if (!title || !category || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    if (amount <= 0 || !amount === 'number') {
      return res.status(400).json({ message: 'Amout must be a positive' });
    }
    await income.save();
    res.status(200).json({ message: 'Income Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getIncomesCategory = async (req, res) => {
  try {
    const incomes = await IncomeSchema.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $count: {} },
          sum: { $sum: '$amount' },
        },
      },
    ]);
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getIncomeToday = async (req, res) => {
  try {
    const { date } = req.params;
    const incomes = await IncomeSchema.find({
      date: `${date}`,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getIncomeMonth = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const incomes = await IncomeSchema.find({
      date: { $gte: startDate, $lte: endDate }, // ค้นหารายรับที่อยู่ระหว่าง startDate - endDate
    });

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: 'Income Deleted' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server Error' });
    });
};
