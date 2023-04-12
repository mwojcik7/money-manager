import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { ErrorProvider } from 'hooks/useError';
import { theme } from 'assets/styles/theme';

import AccountsProvider from 'providers/AccountsProvider';
import CategoriesProvider from 'providers/CategoriesProvider';
import TransactionsProvider from 'providers/TransactionsProvider';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import Accounts from 'views/Accounts';
import Categories from 'views/Categories';
import Transactions from 'views/Transactions';

import { GlobalStyle } from 'assets/styles/GlobalStyle.styles';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ErrorProvider>
          <GlobalStyle />
          <MainTemplate>
            <TransactionsProvider>
              <AccountsProvider>
                <CategoriesProvider>
                  <Routes>
                    <Route path="/" element={<Navigate to="/accounts" />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="*" element={<Navigate to="/accounts" />} />
                  </Routes>
                </CategoriesProvider>
              </AccountsProvider>
            </TransactionsProvider>
          </MainTemplate>
        </ErrorProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
