import styled from 'styled-components';

export const StyledCategoryItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  user-select: none;
`;
