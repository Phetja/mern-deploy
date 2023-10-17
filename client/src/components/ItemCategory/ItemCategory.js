import React from 'react';
import styled from 'styled-components';

import {
  baht,
  car,
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
  const expenseIconColor = () => {
    switch (id) {
      case 'food':
        return '203,146,4';
      case 'coffee':
        return '111,78,55';
      case 'travelling':
        return '89,135,255';
      case 'clothing':
        return '224,92,139';
      case 'mobile':
        return '144,77,229';
      case 'store':
        return '216,37,0';
      case 'health':
        return '6,125,88';
      case 'shopping':
        return '216,37,0';
      case 'personal':
        return '255,158,59';
      case 'supplies':
        return '208,196,4';
      case 'other':
        return '61,61,61';
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
