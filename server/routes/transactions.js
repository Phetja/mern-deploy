const {
  addExpense,
  getExpense,
  deleteExpense,
  getExpenseToday,
  getExpenseAnalysis,
} = require('../controllers/expense');
const {
  addIncome,
  getIncomes,
  getIncomeToday,
  deleteIncome,
  getIncomesCategory,
} = require('../controllers/income');
const { addGoal } = require('../controllers/goal');

const router = require('express').Router();

router
  // income
  .post('/add-income', addIncome)
  .get('/get-incomes', getIncomes)
  .get('/get-incomesCategory', getIncomesCategory)
  .get('/get-incomeToday/:date', getIncomeToday)
  .delete('/delete-income/:id', deleteIncome)
  // expense
  .post('/add-expense', addExpense)
  .get('/get-expense', getExpense)
  .get('/get-expenseAnalysis/:year', getExpenseAnalysis)
  .get('/get-expenseToday/:date', getExpenseToday)
  .delete('/delete-expense/:id', deleteExpense)

  // goal
  .post('/add-goal', addGoal);

module.exports = router;
