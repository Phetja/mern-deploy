import React from 'react';
import styled from 'styled-components';

import {
  bank,
  beer,
  car,
  clothing,
  coffee,
  coin,
  food,
  info,
  medical,
  mobile,
  money,
  personal,
  shopping,
  store,
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
      case 'other':
        return coin;
      default:
        return coin;
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case 'food':
        return food;
      case 'coffee':
        return coffee;
      case 'travelling':
        return car;
      case 'clothing':
        return clothing;
      case 'mobile':
        return mobile;
      case 'store':
        return store;
      case 'health':
        return medical;
      case 'shopping':
        return shopping;
      case 'personal':
        return personal;
      case 'supplies':
        return beer;
      case 'other':
        return info;
      default:
        return info;
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
        return '165,35,110';
      case 'coffee':
        return '75,40,30';
      case 'travelling':
        return '250,190,15';
      case 'clothing':
        return '224,92,139';
      case 'mobile':
        return '240,105,55';
      case 'store':
        return '235,30,75';
      case 'health':
        return '45,150,155';
      case 'shopping':
        return '216,37,0';
      case 'personal':
        return '110,180,245';
      case 'supplies':
        return '5,215,160';
      case 'other':
        return '10,55,85';
      default:
        return '61,61,61';
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
