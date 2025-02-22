import React from 'react';
import { InnerLayout } from '../styles/Layouts';
import { Button, Col, Input, Row, Select, Space } from 'antd';
import styled from 'styled-components';
import { useGlobalContext } from '../context/GlobalContext';
import { useState } from 'react';

function DailyBudget() {
  const { addDailyBudget, insertStatus } = useGlobalContext();
  const [inputState, setInputState] = useState({
    dailyBudget: '',
  });

  const { dailyBudget } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addDailyBudget(inputState);
    setInputState({
      dailyBudget: '',
    });
  };
  return (
    <DailyBudgetStyled>
      <InnerLayout>
        <Row>
          <Col md={12}>
            <div className="daily-budget-title">
              <h1>DailyBudget</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} style={{ marginBottom: '1rem' }}>
            <form onSubmit={handleSubmit}>
              <Space
                direction="vertical"
                style={{
                  display: 'flex',
                }}
              >
                <Input
                  name="dailyBudget"
                  placeholder="dailyBudget"
                  required
                  size="large"
                  value={dailyBudget}
                  onChange={handleInput('dailyBudget')}
                />

                {insertStatus ? (
                  <Button type="primary" htmlType="submit" size="large" block>
                    Add DailyBudget
                  </Button>
                ) : (
                  <Button type="primary" size="large" loading block>
                    Loading
                  </Button>
                )}
              </Space>
            </form>
          </Col>
        </Row>
      </InnerLayout>
    </DailyBudgetStyled>
  );
}
const DailyBudgetStyled = styled.nav``;
export default DailyBudget;
