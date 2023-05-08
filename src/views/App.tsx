import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { ErrorProvider } from 'hooks/useError';
import { theme } from 'assets/styles/theme';

import AccountsProvider from 'providers/AccountsProvider';
import CategoriesProvider from 'providers/CategoriesProvider';
import TransactionsProvider from 'providers/TransactionsProvider';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import Loading from 'components/organisms/Loading/Loading';

import { GlobalStyle } from 'assets/styles/GlobalStyle.styles';

const Accounts = lazy(() => import('views/Accounts'));
const Categories = lazy(() => import('views/Categories'));
const Transactions = lazy(() => import('views/Transactions'));

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
                  <Suspense fallback={<Loading />}>
                    <Routes>
                      <Route path="/" element={<Navigate to="/accounts" />} />
                      <Route path="/accounts" element={<Accounts />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/transactions" element={<Transactions />} />
                      <Route path="*" element={<Navigate to="/accounts" />} />
                    </Routes>
                  </Suspense>
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
