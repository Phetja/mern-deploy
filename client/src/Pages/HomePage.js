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
    getMonthlyTotals,
    getDailyBudget,
    daily,
  } = useGlobalContext();
  const [...history] = todayHistory();
  const [todayTotals, setTodayTotals] = useState({
    totalIncome: 0,
    totalExpense: 0,
  });
  // State สำหรับเก็บยอดรวมของเดือนนี้
  const [monthlyTotals, setMonthlyTotals] = useState({
    totalIncome: 0,
    totalExpense: 0,
  });
  // ดึงข้อมูลยอดรวมของเดือนปัจจุบัน
  useEffect(() => {
    const fetchMonthlyTotals = async () => {
      const totals = await getMonthlyTotals();
      setMonthlyTotals(totals);
    };
    fetchMonthlyTotals();
  }, [monthlyTotals]);

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
    if (!todayTotals.totalExpense && !todayTotals.totalIncome) {
      fetchTotals();
    }
  }, [todayTotals]);
  const budget = daily.dailybudget;
  const spent = todayTotals.totalExpense - todayTotals.totalIncome;
  const percentage = budget === 0 ? 0 : Math.round((spent / budget) * 100);
  // const todayTotal = todayTotals.totalExpense - todayTotals.totalIncome;
  const todayTotal = useMemo(() => {
    return todayTotals.totalExpense - todayTotals.totalIncome;
  }, [todayTotals]); // คำนวณใหม่เฉพาะเมื่อ todayTotals เปลี่ยน

  const getProgressStyles = (percentage) => {
    if (percentage >= 100) return { bgColor: '#F44336', labelColor: 'white' };
    if (percentage >= 75) return { bgColor: '#FF9800', labelColor: '#000000' };
    if (percentage >= 50) return { bgColor: '#FFC107 ', labelColor: '#000000' };
    return { bgColor: '#4CAF50', labelColor: '#000000' };
  };
  const { bgColor, labelColor } = getProgressStyles(percentage);

  return (
    <InnerLayout>
      {!dataLoaded ? (
        <Loading />
      ) : (
        <HomeStyled>
          <Row gutter={[8]}>
            <Col xs={24} md={12}>
              <div className="wallet-summary">
                <Row>
                  <Col xs={24} md={24}>
                    <div className="title">
                      <h1>My Wallet</h1>
                      <img src={logo} className="logo" />
                      <p> {monthlyTotals.totalExpense}</p>
                    </div>
                    {/* <Card
                      title={'Total Balance'}
                      amount={numFormat(netTotal)}
                    /> */}
                    <div style={{ marginBottom: '1rem' }}>
                      <ExpenseCard
                        title={'Total Balance'}
                        amount={numFormat(netTotal)}
                        percentage={''}
                        bgColor="#F7F9FC" // พื้นหลังสีขาว
                        progressColor={bgColor}
                        labelColor={'#4A4A68'}
                      />
                    </div>
                    <div>
                      <ExpenseCard
                        title={'Total Today'}
                        amount={todayTotal}
                        percentage={percentage}
                        bgColor="#ffffff" // พื้นหลังสีขาว
                        progressColor={bgColor}
                        labelColor={labelColor}
                      />
                    </div>
                  </Col>

                  {/* <Col xs={24} md={24}>
                    <Card
                      title={'Total Today'}
                      amount={numFormat(todayTotal)}
                    />
                  </Col> */}
                </Row>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="today-transactions">
                {' '}
                <Row>
                  <Col xs={24} md={24}>
                    <div className="item">
                      <div className="today-title">Today</div>
                      <div className="incomes scrollable-container">
                        {history.map((income) => {
                          const { _id, title, amount, date, category, type } =
                            income;
                          return (
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
                          );
                        })}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </HomeStyled>
      )}
    </InnerLayout>
  );
}
const HomeStyled = styled.nav`
  .wallet-summary {
    .title {
      display: flex;
      justify-content: space-between;
    }
    .logo {
      display: none;
      widht: 2rem;
      height: 2rem;
    }
  }
  .line {
      border-left: 3px solid #222260;
    }
  }
  .today-transactions {
    .today-title {
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;
      align-item: center;
      font-size: 24px;
    }
    .scrollable-container {
      max-height: 400px; /* ปรับขนาดสูงสุดตามต้องการ */
      overflow-y: auto;  /* ให้สามารถเลื่อนแนวตั้ง */
      overflow-x: hidden; /* ปิดการเลื่อนแนวนอน */
      padding-right: 8px; /* ป้องกันแถบ Scroll ทับเนื้อหา */
    }
  }

  @media screen and (max-width: 768px) {
  .wallet-summary {
    .title {
      justify-content: space-between;
    }
    .logo {
      display: block;
    }
  }
  .today-transactions {
    .item {
      margin-top: 1rem;
    }  
  }
`;
export default HomePage;
