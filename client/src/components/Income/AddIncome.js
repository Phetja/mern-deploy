import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/GlobalContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { numFormat } from '../../utils/numFormat';
import IncomeForm from '../Form/IncomeForm';

function AddIncome() {
  const { getIncomes, totalIncome } = useGlobalContext();
  useEffect(() => {
    getIncomes();
  }, []);
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
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
          <Col xs={12} md={8}></Col>
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
    background: #126fec;
    box-shadow: 0px 2px 5px grey;
    border-radius: 20px;
    padding: 1rem;
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
      span {
        font-size: 1.5srem;
        font-weight: 600;
        color: #ffffff;
      }
    }
  }
`;

export default AddIncome;
