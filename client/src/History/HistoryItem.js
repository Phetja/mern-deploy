import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../utils/dateFormat';

import {
  bitcoin,
  calender,
  car,
  card,
  circle,
  coffee,
  food,
  freelance,
  medical,
  mobile,
  money,
  piggy,
  shopping,
  stocks,
  store,
  takeaway,
  tv,
  users,
  yt,
} from '../utils/icons';
import { numFormat } from '../utils/numFormat';

function HistoryItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) {
  const categoryIcon = () => {
    switch (category) {
      case 'salary':
        return money;
      case 'freelancing':
        return freelance;
      case 'investments':
        return stocks;
      case 'stocks':
        return users;
      case 'bitcoin':
        return bitcoin;
      case 'bank':
        return card;
      case 'youtube':
        return yt;
      case 'other':
        return piggy;
      default:
        return '';
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case 'coffee':
        return coffee;
      case 'food':
        return food;
      case 'health':
        return medical;
      case 'subscriptions':
        return tv;
      case 'takeaways':
        return takeaway;
      case 'shopping':
        return shopping;
      case 'travelling':
        return car;
      case 'store':
        return store;
      case 'mobile':
        return mobile;
      case 'other':
        return circle;
      default:
        return '';
    }
  };

  console.log('type', type);

  return (
    <IncomeItemStyled indicator={indicatorColor}>
      <div className="icon">
        {type === 'expense' ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <div className="inner-content">
          <div>
            <h5>{title}</h5>
            <p>
              {calender} {dateFormat(date)}
            </p>
          </div>
          <div className="delete-item">
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
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #fafafa;
  box-shadow: 0px 0px 3px grey;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #000000;
  .icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 1.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;

    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .delete-item{
      display: flex;
      align-items: center;
      p{
        margin:0;
      }
      Button{
        margin-left:1rem;
      }
    }
  }

  @media screen and (max-width: 750px) {

  }
`;

export default HistoryItem;
