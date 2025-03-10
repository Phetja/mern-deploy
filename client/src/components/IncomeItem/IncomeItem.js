import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { DeleteOutlined } from '@ant-design/icons';

import {
  baht,
  bank,
  beer,
  bus,
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
} from '../../utils/icons';
import { Button } from 'antd';
import { numFormat } from '../../utils/numFormat';

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  deleteItem,
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
        return bus;
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
  console.log('type', type);
  const handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
  };
  return (
    <IncomeItemStyled indicator={indicatorColor} onClick={() => handleClick}>
      <div className="icon">
        {type === 'expense' ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <div className="inner-content">
          <div>
            <h5>{category}</h5>
            <p>{dateFormat(date)}</p>
          </div>
          <div className="delete-item">
            <p>
              {baht} {numFormat(amount)}
            </p>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteItem(id)}
            />
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
  margin:0.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #000000;
  p {
    margin: 0;
  }
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

export default IncomeItem;
