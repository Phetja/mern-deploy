import React from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { Doughnut, Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { expenseAnlaysis } = useGlobalContext();
  const data = {
    labels: expenseAnlaysis.map((inc) => {
      const { _id } = inc;
      return _id;
    }),
    datasets: [
      {
        label: '',
        data: [
          ...expenseAnlaysis.map((income) => {
            const { sum } = income;
            return sum;
          }),
        ],
        backgroundColor: [
          'rgb(229, 118, 92)',
          'rgb(224, 184, 81)',
          'rgb(224,92,139)',
          'rgb(87,217,115)',
          'rgb(90,157,224)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <ChartStyled>
      <Doughnut data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
