import React, { useContext, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
const BASE_URL = 'https://mern-deploy-backend-9ewg.onrender.com/api/v1/';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [incomesToday, setIncomesToday] = useState([]);
  const [expensesToday, setExpensesToday] = useState([]);
  const [expenseAnlaysis, setExpenseAnlaysis] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalLoad, setTotalLoad] = useState(false);
  const [insertStatus, setInsertStatus] = useState(true);
  const [deleteStatus, setDeleteStatus] = useState(true);
  const [goals, setGoals] = useState([]);
  const maxDate = moment(new Date(), 'DD-MM-YYYY').format('L');

  //calculate income
  const addIncome = async (income) => {
    try {
      setInsertStatus(false);
      const response = await axios
        .post(`${BASE_URL}add-income`, income)
        .catch((err) => {
          setError(err.response.data.message);
        });
      getIncomes();
    } catch (error) {
    } finally {
      setInsertStatus(true);
    }
  };

  const addGoal = async (income) => {
    try {
      // setInsertStatus(false);
      const response = await axios
        .post(`${BASE_URL}add-goal`, income)
        .catch((err) => {
          setError(err.response.data.message);
        });
    } catch (error) {
    } finally {
      // setInsertStatus(true);
    }
  };

  const getGoals = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-goals`);
      setGoals(response.data);
      console.log(response.data);
    } catch (error) {
    } finally {
    }
  };

  const getIncomes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
      console.log(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const deleteIncome = async (id) => {
    try {
      setDeleteStatus(false);
      const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes();
    } catch (error) {
    } finally {
      setDeleteStatus(true);
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });
    return totalIncome;
  };

  //calculate expense
  const addExpense = async (income) => {
    try {
      setInsertStatus(false);
      const response = await axios
        .post(`${BASE_URL}add-expense`, income)
        .catch((err) => {
          setError(err.response.data.message);
        });
      getExpense();
    } catch (error) {
    } finally {
      setInsertStatus(true);
    }
  };

  const getExpense = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}get-expense`);
      setExpenses(response.data);
      console.log(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpense();
  };

  const totalExpense = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense = totalExpense + expense.amount;
    });
    return totalExpense;
  };

  //total
  const totalBalance = () => {
    let total;
    try {
      setTotalLoad(true);
      total = totalIncome() - totalExpense();
    } catch (error) {
    } finally {
      setTotalLoad(false);
      return total;
    }
  };
  //total
  const totalBalanceToday = () => {
    let totalBalance = 0;
    totalBalance = totalIncomeToday() - totalExpenseToday();
    return totalBalance;
  };

  //today
  const getIncomesToday = async () => {
    const maxDate = moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');
    const response = await axios.get(`${BASE_URL}get-incomeToday/${maxDate}`);
    setIncomesToday(response.data);
    console.log(response.data);
  };
  const getExpenseToday = async () => {
    const maxDate = moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');
    const response = await axios.get(`${BASE_URL}get-expenseToday/${maxDate}`);
    setExpensesToday(response.data);
    console.log(response.data);
  };
  const totalIncomeToday = () => {
    let totalIncome = 0;
    incomesToday.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });
    return totalIncome;
  };
  const totalExpenseToday = () => {
    let totalExpense = 0;
    expensesToday.forEach((expense) => {
      totalExpense = totalExpense + expense.amount;
    });
    return totalExpense;
  };

  //history
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  const transactionIncome = () => {
    const history = [...incomes];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 5);
  };
  const transactionExpens = () => {
    const history = [...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 5);
  };

  const transactionAllHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 5);
  };

  const todayHistory = () => {
    const history = [...incomesToday, ...expensesToday];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history;
  };

  const getExpenseAnalysis = async (year) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}get-expenseAnalysis/${year}`
      );
      setExpenseAnlaysis(response.data);
      console.log(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const totalExpenseAnalysis = () => {
    let totalExpenseAnalysis = 0;
    expenseAnlaysis.forEach((expense) => {
      totalExpenseAnalysis = totalExpenseAnalysis + expense.sum;
    });
    return totalExpenseAnalysis;
  };

  // console.log(transactionHistory());
  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpense,
        deleteExpense,
        expenses,
        totalExpense,
        totalBalance,
        transactionHistory,
        transactionAllHistory,
        error,
        setError,
        getIncomesToday,
        incomesToday,
        getExpenseToday,
        expensesToday,
        todayHistory,
        transactionIncome,
        transactionExpens,
        totalIncomeToday,
        totalExpenseToday,
        totalBalanceToday,
        expenseAnlaysis,
        getExpenseAnalysis,
        totalExpenseAnalysis,
        loading,
        insertStatus,
        deleteStatus,
        totalLoad,
        addGoal,
        getGoals,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
