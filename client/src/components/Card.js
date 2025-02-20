import React from 'react';
import styled from 'styled-components';

const Card = ({ title, amount }) => {
  return (
    <CardStyled>
      <div className="card">
        <div className="card-balance">
          <h2>{title}</h2>
          <h3>
            {amount} {'บาท'}
          </h3>
        </div>
      </div>
    </CardStyled>
  );
};
const CardStyled = styled.nav`
  .card {
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 1rem;
    .card-balance {
      width: 100%;
      padding-left: 1rem;
      h3 {
        font-size: 2rem;
      }
    }
  }

  @media screen and (max-width: 750px) {
    .card {
      padding: 1rem;
      .card-balance {
        padding-left: 0rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Card;
