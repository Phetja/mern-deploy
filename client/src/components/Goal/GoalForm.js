import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

function GoalForm() {
  const { addGoal } = useGlobalContext();
  const [inputState, setInputState] = useState({
    plan: '',
    amount: '',
    monthly: '',
  });

  const { plan, amount, monthly } = inputState;
  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal(inputState);
    setInputState({
      plan: '',
      amount: '',
      monthly: '',
    });
  };
  useEffect(() => {
    setInputState({ ...inputState });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="plan"
        placeholder="Goal"
        value={plan}
        size="large"
        required
        onChange={handleInput('plan')}
      />
      <Input
        name="amount"
        placeholder="Amount"
        required
        size="large"
        value={amount}
        onChange={handleInput('amount')}
      />
      <Input
        name="monthly"
        placeholder="monthly"
        required
        size="large"
        value={monthly}
        onChange={handleInput('monthly')}
      />
      <Button type="primary" htmlType="submit" size="large" block>
        Add Expense
      </Button>
    </form>
  );
}

export default GoalForm;
