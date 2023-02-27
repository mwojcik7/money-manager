import styled from 'styled-components';

export const StyledList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  height: calc(100% - 160px);
  padding: 20px;
  padding-bottom: 80px;
  overflow-y: auto;
`;

export const StyledNoCategories = styled.h2`
  display: flex;
  justify-content: center;
`;
