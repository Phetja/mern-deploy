import React, { useEffect, useRef, useState } from 'react';
import { Input, Select, DatePicker, Button, Space } from 'antd';
import { useGlobalContext } from '../../context/GlobalContext';
import dayjs from 'dayjs';
import NumberPad from '../Numpad/Numpad';

function ExpenseForm() {
  const { addExpense, insertStatus } = useGlobalContext();
  const now = dayjs().format('YYYY-MM-DD');

  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: now,
    category: '',
  });

  const [showPad, setShowPad] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const amountInputRef = useRef(null);

  const handleInputChange = (name) => (e) =>
    setInputState((prev) => ({ ...prev, [name]: e.target.value }));

  const handleDateChange = (date) =>
    setInputState((prev) => ({ ...prev, date: date.format('YYYY-MM-DD') }));

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputState((prev) => ({ ...prev, amount: value }));
    }
  };

  const handleAddNumber = (num) =>
    setInputState((prev) => ({ ...prev, amount: prev.amount + num }));

  const handleDelete = () =>
    setInputState((prev) => ({ ...prev, amount: prev.amount.slice(0, -1) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({ title: '', amount: '', date: now, category: '' });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPad &&
        amountInputRef.current?.input &&
        !amountInputRef.current.input.contains(event.target) &&
        !event.target.closest('.number-pad, .number-pad-btn')
      ) {
        setShowPad(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showPad]);

  const categoryOptions = [
    { value: 'food', label: 'อาหาร' },
    { value: 'coffee', label: 'กาแฟ' },
    { value: 'travelling', label: 'เดินทาง' },
    { value: 'clothing', label: 'เสื้อผ้า' },
    { value: 'mobile', label: 'ค่าน้ำ/ค่าไฟ/มือถือ' },
    { value: 'store', label: 'ร้านค้า/7-11' },
    { value: 'health', label: 'ค่ายา' },
    { value: 'personal', label: 'ส่วนตัว' },
    { value: 'supplies', label: 'ของไม่จำเป็น' },
    { value: 'other', label: 'อื่นๆ' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Select
          size="large"
          value={inputState.category}
          onChange={(value) =>
            setInputState((prev) => ({ ...prev, category: value }))
          }
          options={categoryOptions}
          style={{ width: '100%' }}
        />

        <Input
          ref={amountInputRef}
          size="large"
          name="amount"
          placeholder="Amount"
          value={inputState.amount}
          inputMode={isMobile ? 'none' : 'numeric'}
          onFocus={() => isMobile && setShowPad(true)}
          onChange={handleAmountChange}
        />

        <Input
          size="large"
          name="title"
          placeholder="Expense Name"
          value={inputState.title}
          required
          onChange={handleInputChange('title')}
        />

        <DatePicker
          size="large"
          format="DD/MM/YYYY"
          defaultValue={dayjs(now, 'YYYY/MM/DD')}
          style={{ width: '100%' }}
          onChange={handleDateChange}
        />

        {showPad && isMobile && (
          <NumberPad
            handleAddNumber={handleAddNumber}
            handleDelete={handleDelete}
            setShowPad={setShowPad}
          />
        )}

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={!insertStatus}
        >
          {insertStatus ? 'Add Expense' : 'Loading'}
        </Button>
      </Space>
    </form>
  );
}

export default ExpenseForm;
