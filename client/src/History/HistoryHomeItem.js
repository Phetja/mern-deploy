import React from 'react';
import styled from 'styled-components';

import {
  bank,
  car,
  circle,
  coffee,
  food,
  medical,
  mobile,
  money,
  piggy,
  shopping,
  store,
  takeaway,
  tv,
  yt,
} from '../utils/icons';
import { numFormat } from '../utils/numFormat';

function HistoryHomeItem({
  id,
  title,
  amount,
  category,
  indicatorColor,
  type,
}) {
  const categoryIcon = () => {
    switch (category) {
      case 'salary':
        return money;
      case 'bank':
        return bank;
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

  const incomeIconColor = () => {
    switch (category) {
      case 'salary':
        return '87,170,115';
      case 'bank':
        return '0,47,110';
      default:
        return '';
    }
  };

  const expenseIconColor = () => {
    switch (category) {
      case 'food':
        return '203,146,4';
      case 'coffee':
        return '111,78,55';
      case 'travelling':
        return '216,37,0';
      default:
        return '';
    }
  };

  console.log('type', type);

  return (
    <IncomeItemStyled indicator={indicatorColor}>
      <div
        className="icon"
        style={{
          background: `rgba(${
            type === 'expense' ? expenseIconColor() : incomeIconColor()
          }, 0.2)`,
          color: `rgba(${
            type === 'expense' ? expenseIconColor() : incomeIconColor()
          }, 1.0)`,
        }}
      >
        {type === 'expense' ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <div className="inner-content">
          <div>
            <h5>{title}</h5>
            <p>
              {category}
              {/* {calender} {dateFormat(date)} */}
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
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #000000;
  .icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
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
      p{
        margin:0;
      }
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
    padding: 0.5rem;
  }
`;

export default HistoryHomeItem;
