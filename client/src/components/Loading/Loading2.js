import React from 'react';
import { Hearts } from 'react-loader-spinner';
import styled from 'styled-components';
import logo from '../../img/asa2.png';
function Loading2() {
  return (
    <LoadingStyled>
      {' '}
      <div className="Loading-container">
        <div className="Loading-logo">
          <img src={logo} alt="" />
        </div>
        <Hearts
          height="80"
          width="80"
          color="#eb1e4b"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </LoadingStyled>
  );
}
const LoadingStyled = styled.nav`
  height: 100vh;
  .Loading-container {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .Loading-logo img {
      wigth: 200px;
      height: 200px;
    }
  }
`;
export default Loading2;
