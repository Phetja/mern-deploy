import React, { useEffect, useState } from 'react';
import { Input, Select, DatePicker, Button, Space } from 'antd';
import { useGlobalContext } from '../../context/GlobalContext';
import dayjs from 'dayjs';

function ExpenseForm() {
  const { addExpense, insertStatus } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const now = dayjs().format('YYYY-MM-DD');
  const { title, amount, category } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      title: '',
      amount: '',
      date: now,
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
          defaultValue="salary"
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
              value: 'food',
              label: 'อาหาร',
            },
            {
              value: 'coffee',
              label: 'กาแฟ',
            },
            {
              value: 'travelling',
              label: 'เดินทาง',
            },
            {
              value: 'clothing',
              label: 'เสื้อผ้า',
            },
            {
              value: 'mobile',
              label: 'ค่าน้ำ/ค่าไฟ/มือถือ',
            },
            {
              value: 'store',
              label: 'ร้านค้า/7-11',
            },
            {
              value: 'health',
              label: 'ค่ายา',
            },
            {
              value: 'personal',
              label: 'ส่วนตัว',
            },
            {
              value: 'supplies',
              label: 'ของไม่จำเป็น',
            },
            {
              value: 'other',
              label: 'อื่นๆ',
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
          placeholder="Expense Name"
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

        {/* <Button type="primary" htmlType="submit" size="large">
          Add Expense
        </Button> */}
        {insertStatus ? (
          <Button type="primary" htmlType="submit" size="large" block>
            Add Expense
          </Button>
        ) : (
          <Button type="primary" size="large" loading block>
            Loading
          </Button>
        )}
      </Space>
    </form>
  );
}

export default ExpenseForm;
