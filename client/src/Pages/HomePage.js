import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import { InnerLayout } from '../styles/Layouts';
import { useGlobalContext } from '../context/GlobalContext';
import { numFormat } from '../utils/numFormat';

import HistoryHomeItem from '../History/HistoryHomeItem';
import ExpenseCard from '../components/Card/ExpenseCard';
import Loading from '../components/Loading/Loading';

import logo from '../img/asa2.png';

function HomePage() {
  const {
    dataLoaded,
    getIncomes,
    getExpense,
    getIncomesToday,
    getExpenseToday,
    todayHistory,
    netTotal,
    getTodayTotals,
    getDailyBudget,
    totalExpenseAnalysis,
    daily,
  } = useGlobalContext();

  // เก็บข้อมูลรายรับ/รายจ่ายของวันนี้
  const [todayTotals, setTodayTotals] = useState({
    totalIncome: 0,
    totalExpense: 0,
  });

  // ดึงข้อมูลรายจ่ายเดือนปัจจุบัน
  const monthTotal = totalExpenseAnalysis();

  useEffect(() => {
    getIncomes();
    getExpense();
    getIncomesToday();
    getExpenseToday();
    getDailyBudget();

    const fetchTotals = async () => {
      const totals = await getTodayTotals();
      setTodayTotals(totals);
    };

    if (!todayTotals.totalIncome && !todayTotals.totalExpense) {
      fetchTotals();
    }
  }, [todayTotals]);

  // คำนวณข้อมูล
  const budget = daily.dailybudget;
  const spentToday = todayTotals.totalExpense - todayTotals.totalIncome;
  const spentThisMonth = monthTotal;

  // คำนวณเปอร์เซ็นต์การใช้จ่าย
  const percentage = budget ? Math.round((spentToday / budget) * 100) : 0;
  const monthlyPercentage = daily.monthlybudget
    ? Math.round((spentThisMonth / daily.monthlybudget) * 100)
    : 0;

  // ใช้ useMemo เพื่อคำนวณใหม่เฉพาะเมื่อ todayTotals เปลี่ยน
  const todayTotal = useMemo(() => spentToday, [todayTotals]);

  // ฟังก์ชันช่วยเลือกสีของ progress bar
  const getProgressStyles = (percentage) => {
    if (percentage >= 100) return { bgColor: '#F44336', labelColor: 'white' };
    if (percentage >= 75) return { bgColor: '#FF9800', labelColor: '#000000' };
    if (percentage >= 50) return { bgColor: '#FFC107', labelColor: '#000000' };
    return { bgColor: '#4CAF50', labelColor: '#000000' };
  };

  const { bgColor, labelColor } = getProgressStyles(percentage);
  const { bgColor: monthlyBgColor, labelColor: monthlyLabelColor } =
    getProgressStyles(monthlyPercentage);

  return (
    <InnerLayout>
      {!dataLoaded ? (
        <Loading />
      ) : (
        <HomeStyled>
          <Row gutter={[16, 16]} justify="space-between">
            <Col xs={24} md={12}>
              <div className="wallet-summary">
                <div className="title">
                  <h1>My Wallet </h1>
                  <img src={logo} className="logo" alt="Logo" />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <ExpenseCard
                    title="Total Balance"
                    amount={numFormat(netTotal)}
                    bgColor="#F7F9FC"
                  />
                </div>

                <div
                  style={{
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    paddingBottom: '16px',
                  }}
                >
                  <Row
                    gutter={[16, 16]}
                    justify="space-between"
                    style={{
                      display: 'flex',
                      flexWrap: 'nowrap',
                      minWidth: '100%',
                    }}
                  >
                    <Col
                      xs={24}
                      md={12}
                      style={{ flex: '0 0 auto', minWidth: '100%' }}
                    >
                      <ExpenseCard
                        title="Total Today"
                        amount={todayTotal}
                        percentage={percentage}
                        bgColor="#ffffff"
                        progressColor={bgColor}
                        labelColor={labelColor}
                      />
                    </Col>
                    <Col
                      xs={24}
                      md={12}
                      style={{ flex: '0 0 auto', minWidth: '100%' }}
                    >
                      <ExpenseCard
                        title="Total Monthly"
                        amount={monthTotal}
                        percentage={monthlyPercentage}
                        bgColor="#ffffff"
                        progressColor={monthlyBgColor}
                        labelColor={monthlyLabelColor}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="today-transactions">
                <div className="today-title">Today</div>
                <div className="incomes scrollable-container">
                  {todayHistory().map(
                    ({ _id, title, amount, date, category, type }) => (
                      <HistoryHomeItem
                        key={_id}
                        id={_id}
                        title={title}
                        amount={amount}
                        date={date}
                        type={type}
                        category={category}
                        indicatorColor="var(--color-green)"
                      />
                    )
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </HomeStyled>
      )}
    </InnerLayout>
  );
}

// ✅ ใช้ Styled Components จัดรูปแบบ UI
const HomeStyled = styled.nav`
  .wallet-summary {
    .title {
      display: flex;
      justify-content: space-between;
    }
    .logo {
      display: none;
      width: 2rem;
      height: 2rem;
    }
  }

  .today-transactions {
    .today-title {
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
    }
    .scrollable-container {
      max-height: 400px;
      overflow-y: auto;
      padding-right: 8px;
    }
  }

  @media screen and (max-width: 768px) {
    .wallet-summary .logo {
      display: block;
    }
    .today-transactions .item {
      margin-top: 1rem;
    }
  }
`;

export default HomePage;
