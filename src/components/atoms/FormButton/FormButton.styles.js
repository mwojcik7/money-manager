import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-width: 100px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.size.s};
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey};
  }
`;
