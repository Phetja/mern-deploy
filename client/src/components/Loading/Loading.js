import React from 'react';
import { DNA, Oval } from 'react-loader-spinner';
import styled from 'styled-components';
function Loading() {
  return (
    <LoadingStyled>
      {' '}
      <div className="Loading-container">
        {/* <DNA
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        /> */}
        <Oval
          height={80}
          width={80}
          color="#126fec"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#126fec"
          strokeWidth={2}
          strokeWidthSecondary={2}
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
  }
`;
export default Loading;
