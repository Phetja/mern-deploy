import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/GlobalContext';
import IncomeItem from '../IncomeItem/IncomeItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { numFormat } from '../../utils/numFormat';
import IncomeForm from '../Form/IncomeForm';

function Income() {
  const { getIncomes, deleteIncome, totalIncome, transactionIncome } =
    useGlobalContext();
  const [...history] = transactionIncome();
  useEffect(() => {
    getIncomes();
  }, []);
  return (
    <IncomeStyled>
      <InnerLayout>
        {/* <h1>Incomes</h1> */}
        <Row>
          <Col md={12}>
            {' '}
            <h2 className="total-income">
              Total Income: <span>{numFormat(totalIncome())}฿</span>
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} style={{ marginBottom: '1rem' }}>
            <IncomeForm />
          </Col>
          <Col xs={12} md={8}>
            <div className="incomes">
              {history.map((income) => {
                const { _id, title, amount, date, category, type } = income;
                return (
                  <IncomeItem
                    key={_id}
                    id={_id}
                    title={title}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteIncome}
                  />
                );
              })}
            </div>
          </Col>
        </Row>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  .incomes {
    flex: 1;
  }
  display: flex;
  overflow: auto;
  .total-income {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #456efe;
    box-shadow: 0px 2px 5px grey;
    border-radius: 10px;
    padding: 2rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
  @media screen and (max-width: 750px) {
    .total-income {
      font-size: 1.5rem;
      flex-direction: column;
      padding: 1rem;
      margin-top: 0;
      span {
        font-size: 2rem;
        font-weight: 600;
        color: #ffffff;
      }
    }
  }
`;

export default Income;
