import styled from 'styled-components';
import { Reorder } from 'framer-motion';

export const StyledReorderGroup = styled(Reorder.Group)`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  height: calc(100% - 115px);
  padding: 20px;
  padding-bottom: 90px;
  overflow-y: auto;
`;

export const StyledNoAccounts = styled.h2`
  display: flex;
  justify-content: center;
`;
