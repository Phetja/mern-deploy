import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/GlobalContext';
import { dateFormat } from '../utils/dateFormat';
import moment from 'moment';
import { numFormat } from '../utils/numFormat';

function History() {
  const { transactionAllHistory } = useGlobalContext();

  const [...history] = transactionAllHistory();
  const maxDate = moment(new Date(), 'DD-MM-YYYY').format();
  return (
    <HistoryStyled>
      <h2>Transaction History</h2>
      {history.map((item) => {
        const { _id, title, amount, type, date } = item;

        return (
          <div key={_id} className="history-item">
            <div>
              <p
                style={{
                  color: '#000',
                }}
              >
                {title}
              </p>
              <div>
                <div className="icon">
                  {dateFormat(date) === dateFormat(maxDate)
                    ? 'today'
                    : dateFormat(date)}
                </div>
              </div>
            </div>

            <div>
              <p
                style={{
                  color: type === 'expense' ? 'red' : 'var(--color-green)',
                }}
              >
                {type === 'expense'
                  ? `-${amount <= 0 ? 0 : numFormat(amount)}`
                  : `+${amount <= 0 ? 0 : numFormat(amount)}`}
              </p>
            </div>
          </div>
        );
      })}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: #fff;
    box-shadow: 0px 0px 3px grey;
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin: 0;
    }
  }

  @media screen and (max-width: 750px) {
    padding-top: 1rem;
  }
`;

export default History;
