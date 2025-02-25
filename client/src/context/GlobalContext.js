import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
const BASE_URL = 'https://mern-deploy-backend-9ewg.onrender.com/api/v1/';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [daily, setDaily] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // เพิ่ม state โหลด

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getIncomes(), getExpense(), getTodayTotals()]); // Fetch all data concurrently
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
  const addDailyBudget = async (income) => {
    try {
      setInsertStatus(false);
      const response = await axios
        .post(`${BASE_URL}add-dailyBudget`, income)
        .catch((err) => {
          setError(err.response.data.message);
        });
      getDailyBudget();
    } catch (error) {
    } finally {
      setInsertStatus(true);
    }
  };
  const getDailyBudget = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-dailyBudget`);
      setDaily(response.data);
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
      setIsDeleting(true); // เริ่มโหลด
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      await getIncomes(); // โหลดข้อมูลใหม่
    } catch (error) {
      console.error('Error deleting income:', error);
    } finally {
      setIsDeleting(false); // หยุดโหลด
    }
  };

  const totalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  // --- Expense ---
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
    try {
      setIsDeleting(true); // เริ่มโหลด
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpense();
    } catch (error) {
      console.error('Error deleting expense:', error);
    } finally {
      setIsDeleting(false); // หยุดโหลด
    }
  };

  const totalExpense = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense = totalExpense + expense.amount;
    });
    return totalExpense;
  };

  //total

  //today
  const getTodayTotals = async () => {
    try {
      const maxDate = moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');
      const [incomeResponse, expenseResponse] = await Promise.all([
        axios.get(`${BASE_URL}get-incomeToday/${maxDate}`),
        axios.get(`${BASE_URL}get-expenseToday/${maxDate}`),
      ]);

      const totalIncome = incomeResponse.data.reduce(
        (sum, income) => sum + income.amount,
        0
      );
      const totalExpense = expenseResponse.data.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      return { totalIncome, totalExpense };
    } catch (error) {
      console.error("Error fetching today's totals:", error);
      // Handle the error, e.g., display an error message or return default values
      return { totalIncome: 0, totalExpense: 0 };
    }
  };

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
      setLoading(true); // เริ่มโหลดข้อมูล
      const response = await axios.get(
        `${BASE_URL}get-expenseAnalysis/${year}`
      );
      setExpenseAnlaysis(response.data);
    } catch (error) {
      console.error('Error fetching expense analysis:', error);
    } finally {
      setLoading(false); // โหลดเสร็จแล้ว
    }
  };

  const totalExpenseAnalysis = () => {
    return expenseAnlaysis.reduce((total, expense) => total + expense.sum, 0);
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
        getTodayTotals,
        // Income-related methods and states
        incomes,
        getIncomes,
        addIncome,
        deleteIncome,
        totalIncome,

        incomesToday,
        getIncomesToday,
        transactionIncome,

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
        // DailyBudget
        daily,
        getDailyBudget,
        addDailyBudget,
        // History-related methods and states
        transactionHistory,
        transactionAllHistory,
        todayHistory,
        isDeleting,

        // Error handling
        error,
        setError,

        // Summary and calculations
        expenseAnlaysis,
        totalIncomes,
        totalExpenses,
        netTotal,

        // Utility states
        insertStatus,
        deleteStatus,
        dataLoaded,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
