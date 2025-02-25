import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/GlobalContext';
import IncomeItem from '../IncomeItem/IncomeItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ExpenseForm from '../Form/ExpenseForm';
import { numFormat } from '../../utils/numFormat';
import LoadingScreen from '../Loading/LoadingScreen';

function Expense() {
  const {
    getExpense,
    deleteExpense,
    totalExpense,
    transactionExpens,
    isDeleting,
  } = useGlobalContext();
  const expenses = transactionExpens();

  useEffect(() => {
    getExpense();
  }, []);

  return (
    <ExpenseStyled>
      <InnerLayout>
        {isDeleting ? (
          <LoadingScreen />
        ) : (
          <div>
            <Row>
              <Col md={12}>
                <h2 className="total-expense">
                  Total Expense: <span>{numFormat(totalExpense())}฿</span>
                </h2>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4} style={{ marginBottom: '1rem' }}>
                <ExpenseForm />
              </Col>
              <Col xs={12} md={8}>
                <div className="scrollable-container">
                  {expenses.map(
                    ({
                      _id,
                      title,
                      amount,
                      date,
                      category,
                      description,
                      type,
                    }) => (
                      <IncomeItem
                        key={_id}
                        id={_id}
                        title={title}
                        description={description}
                        amount={amount}
                        date={date}
                        type={type}
                        category={category}
                        indicatorColor="var(--color-green)"
                        deleteItem={deleteExpense}
                      />
                    )
                  )}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-expense {
    color: #fff;
    text-align: center;
    background: #456efe;
    box-shadow: 0px 2px 5px grey;
    border-radius: 10px;
    padding: 2rem;
    margin: 1rem 0;
    font-size: 2rem;

    span {
      font-size: 2.5rem;
      font-weight: 800;
    }
  }

  @media screen and (max-width: 750px) {
    .total-expense {
      font-size: 1.5rem;
      padding: 1rem;

      span {
        font-size: 2rem;
        font-weight: 600;
      }
    }

    .scrollable-container {
      margin: 0rem;
      max-height: 400px;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 8px;
    }
  }
`;

export default Expense;
