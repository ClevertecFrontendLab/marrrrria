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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
  <React.StrictMode>
    <HashRouter>
      <Routes>
        {/* <Route path='/' element={<Navigate to='/books/all'/>} /> */}

        <Route path='/auth' element={<Authorization/>} />
        <Route path='/registration' element={<Registration/>} />
        <Route path='/forgot-pass' element={<ForgotPassword/>} />

        <Route path='/books' element={<Navigate to='/books/all'/>} />
        <Route path='/books/:category' element={<MainPage />} />
        <Route path='/rules' element={<RulesPage />} />
        <Route path='/contract' element={<ContractPage />} />
        <Route path='/books/:category/:bookId' element={<BookPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
  </Provider>
);
