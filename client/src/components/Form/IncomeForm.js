import React, { useEffect, useState } from 'react';
import { Input, Select, DatePicker, Button, Space } from 'antd';
import { useGlobalContext } from '../../context/GlobalContext';
import dayjs from 'dayjs';
import NumberPad from '../์ีNumpad/Numpad';

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
  // State สำหรับแสดง/ซ่อนแป้นตัวเลข
  const [showPad, setShowPad] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
  // อัปเดตค่าของ inputState
  const handleAddNumber = (num) => {
    setInputState((prev) => ({
      ...prev,
      amount: prev.amount + num,
    }));
  };
  const handleChange = (e) => {
    const value = e.target.value;
    // อนุญาตเฉพาะตัวเลข
    if (/^\d*$/.test(value)) {
      setInputState({ amount: value });
    }
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
            Add Income
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

export default IncomeForm;
