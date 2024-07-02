import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GoalForm from './GoalForm';
import { InnerLayout } from '../../styles/Layouts';
// import { styled } from 'styled-components';

function Goal() {
  return (
    <InnerLayout>
      <Row>
        <Col xs={12} md={4} style={{ marginBottom: '1rem' }}>
          <GoalForm />
        </Col>
      </Row>
    </InnerLayout>
  );
}

// const GoalStyled = styled.div`

// `
export default Goal;
