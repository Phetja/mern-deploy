import React from 'react';
import styled from 'styled-components';
import { Flex, Progress } from 'antd';

import {
  baht,
  bus,
  circle,
  coffee,
  food,
  medical,
  mobile,
  shopping,
  store,
  takeaway,
  tv,
} from '../../utils/icons';
import { numFormat } from '../../utils/numFormat';

function ItemCategory({ id, sum, total }) {
  const categoryIcon = () => {
    switch (id) {
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
        return bus;
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
  const expenseIconColor = () => {
    switch (id) {
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

  const totalPercent = parseFloat((sum / total) * 100).toFixed();

  return (
    <ItemCategoryStyled>
      <div
        className="icon"
        style={{ background: `rgba(${expenseIconColor()}, 1.0)` }}
      >
        {totalPercent} %
      </div>
      <div className="content">
        <div className="inner-content">
          <p>{id} </p>
          <div className="delete-item">
            <p>
              {baht} {numFormat(sum)}
            </p>
          </div>
        </div>
      </div>
    </ItemCategoryStyled>
  );
}

const ItemCategoryStyled = styled.div`
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
  font-weight: bold;
  font-size:1rem;
  p {
    margin: 0;
  }
  .icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:10px;
    color: #fff;

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
  
  }
  @media screen and (max-width: 750px) {
    font-size:2rem;
  }

`;

export default ItemCategory;
