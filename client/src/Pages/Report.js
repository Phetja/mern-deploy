import React, { useEffect, useState } from 'react';
import { InnerLayout } from '../styles/Layouts';
import { Col, Row, Select, Space } from 'antd';
import SelectDate from '../components/Analysis/SelectDate';
import { useGlobalContext } from '../context/GlobalContext';
import { numFormat } from '../utils/numFormat';
import ItemCategory from '../components/ItemCategory/ItemCategory';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { chart_pie, chart_bar, chart_line } from '../utils/icons';
import LoadingScreen from '../components/Loading/LoadingScreen';
import { useMediaQuery } from 'react-responsive';

const { Option } = Select;

const rgbToHex = (r, g, b) =>
  `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;

const getColorById = (id) => {
  const colors = {
    food: rgbToHex(165, 35, 110),
    coffee: rgbToHex(75, 40, 30),
    travelling: rgbToHex(250, 190, 15),
    clothing: rgbToHex(224, 92, 139),
    mobile: rgbToHex(240, 105, 55),
    store: rgbToHex(235, 30, 75),
    health: rgbToHex(45, 150, 155),
    shopping: rgbToHex(216, 37, 0),
    personal: rgbToHex(110, 180, 245),
    supplies: rgbToHex(5, 215, 160),
    other: rgbToHex(10, 55, 85),
  };
  return colors[id] || rgbToHex(61, 61, 61);
};

function Report() {
  const { expenseAnlaysis, totalExpenseAnalysis, loading } = useGlobalContext();
  const total = totalExpenseAnalysis();
  const [chartType, setChartType] = useState('pie');
  const isMobile = useMediaQuery({ maxWidth: 767 }); // ตรวจสอบว่าหน้าจอเป็นมือถือหรือไม่

  const chartSize = isMobile
    ? { width: 350, height: 350 }
    : { width: 500, height: 400 }; // ปรับขนาดกราฟ
  const dataWithPercent = expenseAnlaysis.map((item) => ({
    ...item,
    percent: ((item.sum / total) * 100).toFixed(1),
  }));

  return (
    <InnerLayout>
      <Row justify="start" gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SelectDate />
            <Select
              value={chartType}
              onChange={setChartType}
              style={{ width: '100%' }}
            >
              <Option value="pie">{chart_pie} Donut Chart</Option>
              <Option value="bar">{chart_bar} Bar Chart</Option>
              <Option value="line">{chart_line} Line Chart</Option>
            </Select>
          </Space>
        </Col>
      </Row>

      {loading ? (
        <div>
          <LoadingScreen />
        </div>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          <Col
            xs={24}
            md={12}
            style={{
              display: 'flex',
              justifyContent: chartType === 'pie' ? 'center' : 'flex-start',
              marginTop: '0.5rem',
            }}
          >
            {chartType === 'pie' && (
              <PieChart width={chartSize.width} height={chartSize.height}>
                <Pie
                  data={dataWithPercent}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 60 : 90}
                  outerRadius={isMobile ? 90 : 120}
                  paddingAngle={5}
                  dataKey="sum"
                  label={({ percent }) => `${percent}%`}
                >
                  {dataWithPercent.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={getColorById(item._id)} />
                  ))}
                </Pie>
                <Tooltip />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={isMobile ? '14px' : '18px'}
                  fontWeight="bold"
                >
                  {numFormat(total)}
                </text>
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  payload={dataWithPercent.map((item) => ({
                    id: item._id,
                    type: 'circle',
                    color: getColorById(item._id),
                    value: item._id,
                  }))}
                  wrapperStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    padding: '10px 0',
                  }}
                />
              </PieChart>
            )}

            {chartType === 'bar' && (
              <BarChart
                width={chartSize.width}
                height={chartSize.height}
                data={expenseAnlaysis}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip formatter={(value) => numFormat(value)} />
                <Legend />
                <Bar dataKey="sum">
                  {expenseAnlaysis.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={getColorById(entry._id)} />
                  ))}
                </Bar>
              </BarChart>
            )}

            {chartType === 'line' && (
              <LineChart
                width={chartSize.width}
                height={chartSize.height}
                data={expenseAnlaysis}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip formatter={(value) => numFormat(value)} />
                <Legend />
                <Line type="monotone" dataKey="sum" stroke="#FF8042" />
              </LineChart>
            )}
          </Col>

          <Col xs={24} md={12}>
            <div className="item">
              <h3
                className="today"
                style={{
                  paddingBottom: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>Expense</div>
                <div>
                  <span style={{ color: 'Black', fontSize: '2rem' }}>
                    {numFormat(total)}
                  </span>
                </div>
              </h3>
              <div className="incomes">
                {expenseAnlaysis.map((expense) => (
                  <ItemCategory
                    key={expense._id}
                    id={expense._id}
                    sum={expense.sum}
                    total={total}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      )}
    </InnerLayout>
  );
}

export default Report;
