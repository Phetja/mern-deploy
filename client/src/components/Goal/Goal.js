import React from 'react';
import Row from 'react-bootstrap/Row';
import GoalForm from './GoalForm';
import { InnerLayout } from '../../styles/Layouts';

function Goal() {
  return (
    <InnerLayout>
      <Row>
        <GoalForm />
      </Row>
    </InnerLayout>
  );
}

export default Goal;
