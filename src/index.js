import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { BookPage } from './pages/book';
import { ContractPage } from './pages/contract/contract-page';
import { MainPage } from './pages/main';
import { RulesPage } from './pages/rules/rules-page';
import { store } from './store';

import './sass/style.scss'
import './index.css';
import { Registration } from './pages/registration/registration';
import { Authorization } from './pages/authorization/authorization';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { App } from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </Provider>
);
