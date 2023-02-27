import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  padding: 20px 35px 0 20px;
`;

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: ${({ color }) => color};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.size.s};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
