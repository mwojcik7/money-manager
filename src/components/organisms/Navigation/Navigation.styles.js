import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  z-index: 1;
`;

export const StyledLink = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.size.xs};
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: '.3s';

  &.active {
    color: ${({ activecolor }) => activecolor};
  }

  :not(.active):hover {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const StyledIcons = styled(FontAwesomeIcon)`
  font-size: ${({ theme }) => theme.size.xl};
`;
