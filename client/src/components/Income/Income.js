import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/GlobalContext';
import IncomeItem from '../IncomeItem/IncomeItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { numFormat } from '../../utils/numFormat';
import IncomeForm from '../Form/IncomeForm';
import LoadingScreen from '../Loading/LoadingScreen';

function Income() {
  const {
    getIncomes,
    deleteIncome,
    totalIncome,
    transactionIncome,
    isDeleting,
  } = useGlobalContext();
  const incomes = transactionIncome();

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <IncomeStyled>
      <InnerLayout>
        {isDeleting ? (
          <LoadingScreen />
        ) : (
          <div>
            <Row>
              <Col md={12}>
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
                <div className="scrollable-container">
                  {incomes.map(
                    ({ _id, title, amount, date, category, type }) => (
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
                    )
                  )}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;

  .total-income {
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

  .scrollable-container {
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 8px;
  }

  @media screen and (max-width: 750px) {
    .total-income {
      font-size: 1.5rem;
      padding: 1rem;

      span {
        font-size: 2rem;
        font-weight: 600;
      }
    }
  }
`;

export default Income;
