import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'views/App';

import 'assets/styles/fonts.css';

// eslint-disable-next-line prettier/prettier
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
