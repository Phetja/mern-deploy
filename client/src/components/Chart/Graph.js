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
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';
import { dateFormat } from '../../utils/dateFormat';
import { months } from '../../utils/months';
import moment from 'moment-timezone';

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

function Graph() {
  const maxDate = moment(new Date(), 'DD-MM-YYYY').format('MMM DD');

  const { incomes, expenses } = useGlobalContext();
  const labels = months({ count: 12 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: `${maxDate}`,
        data: [
          ...incomes.map((income) => {
            const { amount } = income;
            return amount;
          }),
        ],
        fill: false,
        backgroundColor: ['rgb(54, 162, 235)'],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 20px;
`;

export default Graph;
