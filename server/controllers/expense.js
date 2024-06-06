const ExpenseSchema = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    date,
  });

  try {
    if (!title || !category || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    if (amount <= 0 || !amount === 'number') {
      return res.status(400).json({ message: 'Amout must be a positive' });
    }
    await expense.save();
    res.status(200).json({ message: 'Expense Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
  console.log(expense);
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getExpenseToday = async (req, res) => {
  try {
    const { date } = req.params;
    const expense = await ExpenseSchema.find({
      date: `${date}`,
    });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: 'Expense Deleted' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server Error' });
    });
};

exports.getCategory = async (req, res) => {
  const incomes = await ExpenseSchema.aggregate([
    {
      $project: {
        category: 1,
        amount: 1,
      },
    },
    {
      $group: {
        _id: '$category',
        count: { $count: {} },
        sum: { $sum: '$amount' },
      },
    },
    { $sort: { sum: -1 } },
  ]);
  res.status(200).json(incomes);
};

exports.getExpenseAnalysis = async (req, res) => {
  const { year } = req.params;

  try {
    if (year.length === 4) {
      const incomes = await ExpenseSchema.aggregate([
        {
          $project: {
            year: { $substr: ['$date', 0, 4] },
            category: 1,
            amount: 1,
          },
        },
        { $match: { year: `${year}` } },
        {
          $group: {
            _id: '$category',
            count: { $count: {} },
            sum: { $sum: '$amount' },
          },
        },
        { $sort: { sum: -1 } },
      ]);
      res.status(200).json(incomes);
    }
    if (year.length === 7) {
      const incomes = await ExpenseSchema.aggregate([
        {
          $project: {
            year: { $substr: ['$date', 0, 7] },
            category: 1,
            amount: 1,
          },
        },
        { $match: { year: `${year}` } },
        {
          $group: {
            _id: '$category',
            count: { $count: {} },
            sum: { $sum: '$amount' },
          },
        },
        { $sort: { sum: -1 } },
      ]);
      res.status(200).json(incomes);
    }
    if (year.length === 10) {
      const incomes = await ExpenseSchema.aggregate([
        {
          $project: {
            year: { $substr: ['$date', 0, 10] },
            category: 1,
            amount: 1,
          },
        },
        { $match: { year: `${year}` } },
        {
          $group: {
            _id: '$category',
            count: { $count: {} },
            sum: { $sum: '$amount' },
          },
        },
        { $sort: { sum: -1 } },
      ]);
      res.status(200).json(incomes);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
