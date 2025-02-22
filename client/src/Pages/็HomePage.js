import React, { useEffect } from 'react';
import { InnerLayout } from '../styles/Layouts';
import { useGlobalContext } from '../context/GlobalContext';
import styled from 'styled-components';
import HistoryHomeItem from '../History/HistoryHomeItem';
import { Col, Row } from 'antd';
import { numFormat } from '../utils/numFormat';
import logo from '../img/asa2.png';
import Loading from '../components/Loading/Loading';
import Card from '../components/Card';
import { useState } from 'react';

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
  } = useGlobalContext();
  const [...history] = todayHistory();
  const [todayTotals, setTodayTotals] = useState({
    totalIncome: 0,
    totalExpense: 0,
  });

  useEffect(() => {
    getIncomes();
    getExpense();
    getIncomesToday();
    getExpenseToday();
    const fetchTotals = async () => {
      const totals = await getTodayTotals();
      setTodayTotals(totals);
    };

    fetchTotals();
  }, []);

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
                    </div>
                    <Card
                      title={'Total Balance'}
                      amount={numFormat(netTotal)}
                    />
                  </Col>
                  <Col xs={24} md={24}>
                    <Card
                      title={'Total Today'}
                      amount={numFormat(
                        todayTotals.totalExpense - todayTotals.totalIncome
                      )}
                    />
                  </Col>
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
                      <div className="incomes">
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
