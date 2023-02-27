import styled from 'styled-components';

export const StyledIconsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const StyledError = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
  margin-bottom: 5px;
`;
