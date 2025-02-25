import styled from 'styled-components';

export const MainLayout = styled.div`
  padding: 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  gap: 1rem;
  @media screen and (max-width: 750px) {
    padding: 0;
  }
`;

export const InnerLayout = styled.div`
  padding: 2rem 1.5rem;
  width: 100%;
  @media screen and (max-width: 750px) {
    padding: 1rem 1rem;
    padding-bottom: 100px;
  }
`;
