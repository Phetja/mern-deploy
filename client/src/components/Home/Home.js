import React, { useEffect } from 'react';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/GlobalContext';
import moment from 'moment';
import styled from 'styled-components';
import HistoryHomeItem from '../../History/HistoryHomeItem';
import { Col, Row } from 'antd';
import { numFormat } from '../../utils/numFormat';
function Home() {
  const {
    getIncomes,
    getExpense,
    getIncomesToday,
    getExpenseToday,
    todayHistory,
    totalBalance,
    totalExpenseToday,
  } = useGlobalContext();
  const [...history] = todayHistory();
  useEffect(() => {
    getIncomes();
    getExpense();
    totalBalance();
    getIncomesToday();
    getExpenseToday();
  }, []);
  return (
    <InnerLayout>
      <HomeStyled>
        <Row gutter={[8]}>
          <Col xs={24} md={12}>
            <Row>
              <Col xs={24} md={24}>
                <h1>Expense</h1>
                <div className="card">
                  <div className="card-balance">
                    <h2>คงเหลือ</h2>
                    <h3>
                      {' '}
                      {numFormat(totalBalance())} {'บาท'}
                    </h3>
                  </div>
                  <div className="card-balance line">
                    <h2>ใช้จ่ายวันนี้</h2>
                    <h3>
                      {' '}
                      {numFormat(totalExpenseToday())} {'บาท'}
                    </h3>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Row>
              <Col xs={24} md={24}>
                <div className="item">
                  <div className="today">Today</div>
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
          </Col>
        </Row>
      </HomeStyled>
    </InnerLayout>
  );
}
const HomeStyled = styled.nav`
  .card {
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .card-balance {
      width: 100%;
      padding-left: 1rem;
      h3 {
        font-size: 2rem;
      }
    }
    .line {
      border-left: 3px solid #222260;
    }
  }
  .today {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-item: center;
    font-size: 24px;
  }

  @media screen and (max-width: 750px) {
    .item {
      margin-top: 1rem;
    }
  }
`;
export default Home;
