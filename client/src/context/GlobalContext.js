import React, { useContext, useEffect, useState } from 'react';
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

  const [insertStatus, setInsertStatus] = useState(true);
  const [deleteStatus, setDeleteStatus] = useState(true);
  // const maxDate = moment(new Date(), 'DD-MM-YYYY').format('L');
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getIncomes(), getExpense()]); // Fetch all data concurrently
        setDataLoaded(true); // Set dataLoaded to true after all fetches are complete
      } catch (error) {
        // Handle errors if necessary
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, []);

  // --- Income ---
  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
      console.log(response.data);
    } catch (error) {
    } finally {
    }
  };

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
    return incomes.reduce((total, income) => total + income.amount, 0);
  };
  // const totalIncome = () => {
  //   let totalIncome = 0;
  //   incomes.forEach((income) => {
  //     totalIncome = totalIncome + income.amount;
  //   });
  //   return totalIncome;
  // };
  // Calculate total income

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
      const response = await axios.get(`${BASE_URL}get-expense`);
      setExpenses(response.data);
      console.log(response.data);
    } catch (error) {
    } finally {
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
      const response = await axios.get(
        `${BASE_URL}get-expenseAnalysis/${year}`
      );
      setExpenseAnlaysis(response.data);
      console.log(response.data);
    } catch (error) {
    } finally {
    }
  };
  const totalExpenseAnalysis = () => {
    let totalExpenseAnalysis = 0;
    expenseAnlaysis.forEach((expense) => {
      totalExpenseAnalysis = totalExpenseAnalysis + expense.sum;
    });
    return totalExpenseAnalysis;
  };

  // คำนวณ totalIncomes และ totalExpenses
  useEffect(() => {
    const incomeSum = incomes.reduce((acc, income) => acc + income.amount, 0);
    setTotalIncomes(incomeSum);
  }, [incomes]);

  useEffect(() => {
    const expenseSum = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    setTotalExpenses(expenseSum);
  }, [expenses]);

  // คำนวณ netTotal เมื่อ totalIncomes หรือ totalExpenses เปลี่ยน
  useEffect(() => {
    setNetTotal(totalIncomes - totalExpenses);
  }, [totalIncomes, totalExpenses]);

  // ดึงข้อมูลเมื่อ component โหลด
  useEffect(() => {
    getIncomes();
    getExpense();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        // Income-related methods and states
        incomes,
        getIncomes,
        addIncome,
        deleteIncome,
        totalIncome,
        incomesToday,
        getIncomesToday,
        transactionIncome,
        totalIncomeToday,

        // Expense-related methods and states
        addExpense,
        getExpense,
        deleteExpense,
        expenses,
        totalExpense,
        getExpenseToday,
        expensesToday,
        transactionExpens,
        totalExpenseAnalysis,
        getExpenseAnalysis,

        // History-related methods and states
        transactionHistory,
        transactionAllHistory,
        todayHistory,

        // Error handling
        error,
        setError,

        // Summary and calculations
        totalExpenseToday,
        totalBalanceToday,
        expenseAnlaysis,
        totalIncomes,
        totalExpenses,
        netTotal,

        // Utility states
        insertStatus,
        deleteStatus,
        dataLoaded,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
