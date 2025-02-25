const {
  addExpense,
  getExpense,
  deleteExpense,
  getExpenseToday,
  getExpenseAnalysis,
  getExpenseMonth,
} = require('../controllers/expense');
const {
  addIncome,
  getIncomes,
  getIncomeToday,
  deleteIncome,
  getIncomesCategory,
  getIncomeMonth,
} = require('../controllers/income');
const {
  getDailyBudget,
  addDailyBudget,
} = require('../controllers/dailybudget');

const router = require('express').Router();

router
  // income
  .post('/add-income', addIncome)
  .get('/get-incomes', getIncomes)
  .get('/get-incomesCategory', getIncomesCategory)
  .get('/get-incomeToday/:date', getIncomeToday)
  .get('/get-incomeMonth/:startOfMonth/:endOfMonth', getIncomeMonth)
  .delete('/delete-income/:id', deleteIncome)
  // expense
  .post('/add-expense', addExpense)
  .get('/get-expense', getExpense)
  .get('/get-expenseAnalysis/:year', getExpenseAnalysis)
  .get('/get-expenseToday/:date', getExpenseToday)
  .get('/get-expenseMonth/:startOfMonth/:endOfMonth', getExpenseMonth)
  .delete('/delete-expense/:id', deleteExpense)

  // goal
  .post('/add-dailyBudget', addDailyBudget)
  .get('/get-dailyBudget', getDailyBudget);

module.exports = router;
