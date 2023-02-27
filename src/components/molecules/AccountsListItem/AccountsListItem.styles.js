import styled from 'styled-components';
import { Reorder } from 'framer-motion';

export const StyledAccountItem = styled(Reorder.Item)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 10px;
  user-select: none;
  cursor: grab;

  :active {
    box-shadow: 0 0 50px #111;
    cursor: grabbing;
  }
`;

export const StyledAccountItemContentBox = styled.div`
  font-size: ${({ theme }) => theme.size.m};

  div:first-child {
    margin-bottom: 5px;
    font-weight: bold;
  }

  div:last-child {
    color: ${({ theme, balance }) => (balance < 0 ? theme.colors.red : balance > 0 ? theme.colors.green : theme.colors.grey)};
  }
`;
