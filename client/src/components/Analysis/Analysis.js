import React from 'react';
import { InnerLayout } from '../../styles/Layouts';
import SelectDate from './SelectDate';
import { Col, Row, Space } from 'antd';
import { useGlobalContext } from '../../context/GlobalContext';
import ItemCategory from '../ItemCategory/ItemCategory';
import { numFormat } from '../../utils/numFormat';
import { coin } from '../../utils/icons';
function Analysis() {
  const { expenseAnlaysis, totalExpenseAnalysis } = useGlobalContext();
  return (
    <InnerLayout>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Space
            direction="vertical"
            size="middle"
            style={{
              display: 'flex',
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <SelectDate />
              </Col>
              <Col xs={24} md={18}></Col>
            </Row>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <div className="item">
            <h3
              className="today"
              style={{
                paddingBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>Expense</div>
              <div>
                {coin}{' '}
                <span style={{ color: 'Black', fontSize: '2rem' }}>
                  {numFormat(totalExpenseAnalysis())}
                </span>{' '}
              </div>
            </h3>

            <div className="incomes">
              {expenseAnlaysis.map((income) => {
                const { _id, sum } = income;
                return (
                  <ItemCategory
                    key={_id}
                    id={_id}
                    sum={sum}
                    total={totalExpenseAnalysis()}
                  />
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={8}></Col>
      </Row>
      <Row></Row>
    </InnerLayout>
  );
}

export default Analysis;
