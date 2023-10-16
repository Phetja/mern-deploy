import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';
import { baht } from '../../utils/icons';
import { useGlobalContext } from '../../context/GlobalContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import HistoryItem from '../../History/HistoryItem';
function Dashboard() {
  const {
    totalExpense,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpense,
    incomes,
    expenses,
    transactionAllHistory,
  } = useGlobalContext();
  const [...history] = transactionAllHistory();
  useEffect(() => {
    getIncomes();
    getExpense();
  }, []);
  return (
    <DashboardStyle>
      <InnerLayout>
        <Container>
          {/* <h1 style={{ marginButton: '16px' }}>Today</h1> */}

          <div>
            <Row gutter={16}>
              <Col span={12}>
                <Card bordered={false} bodyStyle={{ background: '#126fec' }}>
                  <Statistic
                    title="รวม"
                    value={totalBalance()}
                    valueStyle={{
                      color: '#fff',
                      background: '#126fec',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix={baht}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} bodyStyle={{ background: '#126fec' }}>
                  <Statistic
                    title="รายรับ"
                    value={totalIncome()}
                    valueStyle={{
                      color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix={baht}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false} bodyStyle={{ background: '#126fec' }}>
                  <Statistic
                    title="รายจ่าย"
                    value={totalExpense()}
                    valueStyle={{
                      color: '#cf1322',
                    }}
                    prefix={<ArrowDownOutlined />}
                    suffix={baht}
                  />
                </Card>
              </Col>
            </Row>
          </div>

          <Row>
            <Col xs={12} md={8}>
              <div className="chart-con">
                <Chart />
              </div>

              <Row>
                {/* <Col xs={12} md={6}>
                  <div className="income">
                    <h3>{accounts} Income</h3>
                    <p>
                      {baht} {totalIncome()}
                    </p>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="expense">
                    <h3>{money} Expense</h3>
                    <p>
                      {baht} {totalExpense()}
                    </p>
                  </div>
                </Col> */}
              </Row>
            </Col>
            <Col xs={12} md={4}>
              <div>
                {history.map((income) => {
                  const {
                    _id,
                    title,
                    amount,
                    date,
                    category,
                    description,
                    type,
                  } = income;
                  return (
                    <HistoryItem
                      key={_id}
                      id={_id}
                      title={title}
                      description={description}
                      amount={amount}
                      date={date}
                      type={type}
                      category={category}
                      indicatorColor="var(--color-green)"
                    />
                  );
                })}
              </div>

              {/* <History /> */}
              <h4 className="salary-title">
                Min <span>Salary</span>Max
              </h4>
              <div className="salary-item">
                <p>${Math.min(...incomes.map((item) => item.amount))}</p>
                <p>${Math.max(...incomes.map((item) => item.amount))}</p>
              </div>
              <h4 className="salary-title">
                Min <span>Expense</span>Max
              </h4>
              <div className="salary-item">
                <p>${Math.min(...expenses.map((item) => item.amount))}</p>
                <p>${Math.max(...expenses.map((item) => item.amount))}</p>
              </div>
            </Col>
          </Row>
        </Container>
        {/* <h1>All Transaction</h1>
        <div className="stats-con">
          <div className="chart-con">
            <div className="chart-display">
              <Chart />
            </div>
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {dollar} {totalExpense()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span>Max
            </h2>
            <div className="salary-item">
              <p>${Math.min(...incomes.map((item) => item.amount))}</p>
              <p>${Math.max(...incomes.map((item) => item.amount))}</p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>${Math.min(...expenses.map((item) => item.amount))}</p>
              <p>${Math.max(...expenses.map((item) => item.amount))}</p>
            </div>
          </div>
        </div> */}
      </InnerLayout>
    </DashboardStyle>
  );
}

const DashboardStyle = styled.div`
  .income,
  .expense,
  .balance {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem;
  }
  .income,
  .expense,
  .balance p {
    font-size: 2rem;
    font-weight: 700;
  }
  p {
    margin: 0;
  }
  .salary-title {
    padding-top: 1rem;
  }
  .salary-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
  }
  .salary-title,
  .salary-item {
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: 750px) and (min-width: 500px) {
    .chart-con {
      display: none;
    }
    .income,
    .expense,
    .balance {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem;
      padding: 1rem 1rem;
    }
    h3 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0rem;
    }
    .income,
    .expense,
    .balance p {
      font-size: 1.5rem;
      font-weight: 700;
    }
    .balance p {
      color: #7539ff;
    }
    .income p {
      color: #22cc62;
    }
    .expense p {
      color: #ff0000;
    }
  }
  @media screen and (max-width: 490px) {
    .chart-con {
      display: none;
    }
    .income,
    .expense,
    .balance {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem;
      padding: 0.5 rem;
    }
  }
`;

export default Dashboard;
