import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

export const ChildrenWrapper = styled.div`
  height: calc(100% - 100px);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;
