import React, { useEffect, useState } from 'react';
import { DatePicker, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useGlobalContext } from '../../context/GlobalContext';
const now = dayjs().format('YYYY-MM-DD');

const dateFormatList = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY'];
const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return (
    <DatePicker
      picker={type}
      onChange={onChange}
      defaultValue={dayjs(now, 'YYYY')}
    />
  );
};
const SelectDate = () => {
  const [type, setType] = useState('year');
  const [year, setYear] = useState('2023');
  const { getExpenseAnalysis } = useGlobalContext();

  const handleDatePicker = (value) => {
    if (type === 'date') {
      getExpenseAnalysis(value.format(dateFormatList[0]));
      setYear(value.format(dateFormatList[0]));
    }
    if (type === 'month') {
      getExpenseAnalysis(value.format(dateFormatList[1]));
      setYear(value.format(dateFormatList[1]));
    }
    if (type === 'year') {
      getExpenseAnalysis(value.format(dateFormatList[2]));
      setYear(value.format(dateFormatList[2]));
    }
  };

  useEffect(() => {
    getExpenseAnalysis(year);
  }, []);
  return (
    <>
      <Row>
        <Space>
          <Select value={type} onChange={setType}>
            <Option value="date">Date</Option>
            <Option value="month">Month</Option>
            <Option value="year">Year</Option>
          </Select>
          <PickerWithType
            type={type}
            onChange={(value) => handleDatePicker(value)}
          />
        </Space>
      </Row>
    </>
  );
};
export default SelectDate;
