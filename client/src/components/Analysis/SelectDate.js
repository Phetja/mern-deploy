import React, { useEffect, useState, useCallback } from 'react';
import { DatePicker, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useGlobalContext } from '../../context/GlobalContext';

const { Option } = Select;
const now = dayjs(); // ค่าปัจจุบัน
const dateFormatList = {
  date: 'YYYY-MM-DD',
  month: 'YYYY-MM',
  year: 'YYYY',
};

const PickerWithType = ({ type, onChange }) => {
  return (
    <DatePicker
      picker={type}
      onChange={onChange}
      defaultValue={dayjs()} // ใช้ค่าปัจจุบันตาม type
      format={dateFormatList[type]} // กำหนด format ตาม type
    />
  );
};

const SelectDate = () => {
  const [type, setType] = useState('month'); // ค่าปริยายเป็นเดือน
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format(dateFormatList['month'])
  ); // ค่าเริ่มต้นเป็นเดือนปัจจุบัน
  const { getExpenseAnalysis } = useGlobalContext();

  const handleDatePicker = (value) => {
    const formattedDate = value.format(dateFormatList[type]);
    setSelectedDate(formattedDate);
    getExpenseAnalysis(formattedDate);
  };

  useEffect(() => {
    getExpenseAnalysis(selectedDate);
  }, [selectedDate]);

  return (
    <Row>
      <Space>
        <Select
          value={type}
          onChange={(value) => {
            setType(value);
            setSelectedDate(dayjs().format(dateFormatList[value])); // อัปเดตค่าตาม type
            getExpenseAnalysis(dayjs().format(dateFormatList[value])); // โหลดข้อมูลใหม่
          }}
          style={{ width: '100%' }} // ทำให้ Select มีขนาดคงที่
        >
          <Option value="date">Date</Option>
          <Option value="month">Month</Option>
          <Option value="year">Year</Option>
        </Select>

        <PickerWithType
          type={type}
          onChange={handleDatePicker}
          style={{ width: '100%' }}
        />
      </Space>
    </Row>
  );
};

export default SelectDate;
