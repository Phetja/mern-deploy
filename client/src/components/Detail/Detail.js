import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { baht } from '../../utils/icons';
import { useGlobalContext } from '../../context/GlobalContext';
import History from '../../History/History';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { numFormat } from '../../utils/numFormat';
function Detail() {
  const {
    totalExpense,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpense,
    incomes,
    expenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpense();
  }, []);
  return (
    <DashboardStyle>
      <InnerLayout>
        {/* <div className="safearea" /> */}
        <Container>
          <h1>All Transaction</h1>
          <Row>
            <Col xs={12} md={8}>
              <div className="card">
                <div className="card-balance">
                  <h2>Total Balance</h2>
                  <h3>
                    {' '}
                    {baht} {numFormat(totalBalance())}
                  </h3>
                </div>
                <div className="card-tran">
                  <div className="inner-card">
                    <div className="inner-content">
                      <div className="tran-text">
                        <Button
                          shape="circle"
                          icon={<ArrowDownOutlined />}
                          size="small"
                        />
                        <p>Income</p>
                      </div>
                      <div>
                        <p>
                          {baht} {numFormat(totalIncome())}
                        </p>
                      </div>
                    </div>
                    <div className="inner-content">
                      <div className="tran-text">
                        <Button
                          shape="circle"
                          icon={<ArrowUpOutlined />}
                          size="small"
                        />

                        <p>Expense</p>
                      </div>
                      <div>
                        <p>
                          {baht} {numFormat(totalExpense())}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="salary">
                <h4 className="salary-title">
                  Min <span>Salary</span>Max
                </h4>
                <div className="salary-item">
                  <p>
                    $
                    {numFormat(Math.min(...incomes.map((item) => item.amount)))}
                  </p>
                  <p>
                    $
                    {numFormat(Math.max(...incomes.map((item) => item.amount)))}
                  </p>
                </div>
                <h4 className="salary-title">
                  Min <span>Expense</span>Max
                </h4>
                <div className="salary-item">
                  <p>
                    $
                    {numFormat(
                      Math.min(...expenses.map((item) => item.amount))
                    )}
                  </p>
                  <p>
                    $
                    {numFormat(
                      Math.max(...expenses.map((item) => item.amount))
                    )}
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <History />
            </Col>
          </Row>
          <Row></Row>
        </Container>
      </InnerLayout>
    </DashboardStyle>
  );
}

const DashboardStyle = styled.div`
  Button {
    color: #fff;
    background: #297dec;
  }
  .card {
    padding: 1rem;
    border-radius: 10px;
    background: #126fec;
    color: #fff;
    box-shadow: 0px 2px 5px grey;
    font-weight: 900;
    h2 {
      font-size: 16px;
    }
    h3 {
      font-size: 25px;
    }
    h2,
    h3 {
      color: #fff;
      font-weight: 900;
    }
  }
  .inner-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .inner-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 50px;
  }
  .tran-text {
    display: flex;
    align-items: center;
    padding: 1rem;
    p {
      margin: 0;
    }
  }

  Button {
    margin-right: 1rem;
  }
  .salary {
    margin-top: 1rem;
  }
  .salary-title,
  .salary-item {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .salary-item {
    background: #fafafa;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    p {
      margin: 0;
    }
  }

  @media screen and (max-width: 750px) {
    h1 {
      margin-top: 1rem;
    }
    .safearea {
      position: fixed;
      top: 0;
      right: 0;

      background: #126fec;
    }
  }
`;

export default Detail;
