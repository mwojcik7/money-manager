import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AccountsProvider from 'providers/AccountsProvider';
import CategoriesProvider from 'providers/CategoriesProvider';
import TransactionsProvider from 'providers/TransactionsProvider';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import Accounts from 'views/Accounts';
import Categories from 'views/Categories';
import Transactions from 'views/Transactions';

import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle.styles';
import { ErrorProvider } from 'hooks/useError';

const App = () => {
  return (
    <TransactionsProvider>
      <AccountsProvider>
        <CategoriesProvider>
          <Router>
            <ThemeProvider theme={theme}>
              <ErrorProvider>
                <GlobalStyle />
                <MainTemplate>
                  <Routes>
                    <Route path="/" exact="true" element={<Navigate to="/accounts" />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="*" element={<Navigate to="/accounts" />} />
                  </Routes>
                </MainTemplate>
              </ErrorProvider>
            </ThemeProvider>
          </Router>
        </CategoriesProvider>
      </AccountsProvider>
    </TransactionsProvider>
  );
};

export default App;
