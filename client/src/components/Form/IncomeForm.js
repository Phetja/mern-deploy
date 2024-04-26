import React, { useEffect, useState } from 'react';
import { Input, Select, DatePicker, Button, Space } from 'antd';
import { useGlobalContext } from '../../context/GlobalContext';
import dayjs from 'dayjs';

function IncomeForm() {
  const { addIncome, insertStatus } = useGlobalContext();
  const [inputState, setInputState] = useState({
    category: '',
    amount: '',
    date: '',
    title: '',
  });

  const now = dayjs().format('YYYY-MM-DD');
  const { title, amount, category } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(inputState);
    setInputState({
      title: '',
      amount: '',
      date: '',
      category: '',
    });
  };

  const handleDatePicker = (date, dateString) => {
    const data = date.format('YYYY-MM-DD');
    setInputState({ ...inputState, date: data });
  };

  useEffect(() => {
    setInputState({ ...inputState, date: now });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Space
        direction="vertical"
        style={{
          display: 'flex',
        }}
      >
        <Select
          size="large"
          defaultValue="Select Option"
          placeholder="Select Option"
          style={{
            width: '100%',
          }}
          name="category"
          value={category}
          onChange={(category) => {
            setInputState({ ...inputState, category: category });
          }}
          options={[
            {
              value: 'salary',
              label: 'Salary',
            },
            {
              value: 'bank',
              label: 'Bank Transfer',
            },
            {
              value: 'other',
              label: 'Other',
            },
          ]}
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
          name="title"
          placeholder="Income Name"
          value={title}
          size="large"
          required
          onChange={handleInput('title')}
        />

        <DatePicker
          defaultValue={dayjs(now, 'YYYY/MM/DD')}
          style={{ width: '100%' }}
          format={'DD/MM/YYYY'}
          size="large"
          onChange={handleDatePicker}
        />

        {insertStatus ? (
          <Button type="primary" htmlType="submit" size="large">
            Add Income
          </Button>
        ) : (
          <Button type="primary" size="large" loading>
            Loading
          </Button>
        )}
      </Space>
    </form>
  );
}

export default IncomeForm;
