import { HashRouter, Routes, Navigate, Route } from 'react-router-dom';
import { MainPage } from './pages/main/main-page';
import { RulesPage } from './pages/rules/rules-page';
import { ContractPage } from './pages/contract/contract-page';
import { BookPage } from './pages/book/book-page';
import { Authorization } from './pages/authorization/authorization';
import { Registration } from './pages/registration/registration';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { useAppSelector } from './hooks/redux';

export function App() {

  const { isAuthorized } = useAppSelector(state => state.library)

  return (
    <HashRouter>
      <Routes>
        {
        isAuthorized && 
        <>
        <Route path='/' element={<Navigate to='/books/all'/>} />
        <Route path='/auth' element={<Navigate to='/'/>} />
        <Route path='/registration' element={<Navigate to='/'/>} />
        <Route path='/forgot-pass' element={<Navigate to='/'/>} />

        <Route path='/books' element={<Navigate to='/books/all'/>} />
        <Route path='/books/:category' element={<MainPage />} />
        <Route path='/rules' element={<RulesPage />} />
        <Route path='/contract' element={<ContractPage />} />
        <Route path='/books/:category/:bookId' element={<BookPage />} />
        </>
        }
        {
        !isAuthorized &&
        <>
        <Route path='/' element={<Navigate to='auth'/>} />
        <Route path='/auth' element={<Authorization/>} />
        <Route path='/registration' element={<Registration/>} />
        <Route path='/forgot-pass' element={<ForgotPassword/>} />

        <Route path='/books' element={<Navigate to='/auth'/>} />
        <Route path='/books/:category' element={<Navigate to='/auth'/>} />
        <Route path='/rules' element={<Navigate to='/auth'/>} />
        <Route path='/contract' element={<Navigate to='/auth'/>} />
        <Route path='/books/:category/:bookId' element={<Navigate to='/auth'/>} />
        </>
        }
      </Routes>
    </HashRouter>
  )
}