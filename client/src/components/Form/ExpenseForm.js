import React, { useEffect, useState } from 'react';
import { Input, Select, DatePicker, Button, Space } from 'antd';
import { useGlobalContext } from '../../context/GlobalContext';
import dayjs from 'dayjs';
import NumberPad from '../์ีNumpad/Numpad';

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
  // State สำหรับแสดง/ซ่อนแป้นตัวเลข
  const [showPad, setShowPad] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
  const handleChange = (e) => {
    const value = e.target.value;
    // อนุญาตเฉพาะตัวเลข
    if (/^\d*$/.test(value)) {
      setInputState({ amount: value });
    }
  };
  // อัปเดตค่าของ inputState
  const handleAddNumber = (num) => {
    setInputState((prev) => ({
      ...prev,
      amount: prev.amount + num,
    }));
  };

  // ลบตัวเลขทีละตัว
  const handleDelete = () => {
    setInputState((prev) => ({
      ...prev,
      amount: prev.amount.slice(0, -1),
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPad &&
        !event.target.closest('.number-pad, .number-pad-btn, input')
      ) {
        setShowPad(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showPad]);

  useEffect(() => {
    setInputState({ ...inputState, date: now });
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          onFocus={() => isMobile && setShowPad(true)}
          onChange={handleChange} // ให้พิมพ์ตัวเลขได้
          name="amount"
          placeholder="Amount"
          inputMode={isMobile ? 'none' : 'numeric'} // ปิดคีย์บอร์ดมือถือเมื่อใช้ Numpad
          // required
          size="large"
          value={amount}
          // onChange={handleInput('amount')}
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
        {/* แสดงแป้นตัวเลข */}
        {showPad && isMobile && (
          <NumberPad
            handleAddNumber={handleAddNumber}
            handleDelete={handleDelete}
            setShowPad={setShowPad}
          />
        )}
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
