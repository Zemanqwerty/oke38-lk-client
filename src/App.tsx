import React, {FC, useContext, useEffect, useState} from 'react';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MainPage from './pages/MainPage';
import TeamsPage from './pages/LoginPage';
import Header from './containers/Header';
import Footer from './containers/Footer';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import RequestForResetPasswordPage from './pages/RequestForResetPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminDashboard from './containers/AdminDashboard';
import AdminApplicationView from './components/adminApplicationView';
import AdminDogovoeEnergoEdit from './components/adminDogovorEnergoEdit';

const App: FC = () => {

  const {store} = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [])

  if (store.isLoading) {
    return (
      <>
      загрузка страницы...
      </>
    )
  }

  return (
    <>
    
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/">
          <Route index element={<MainPage type='index'/>} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegistrationPage />} />
          <Route path="/request-for-reset" element={<RequestForResetPasswordPage />} />
          <Route path="/reset-password/:link" element={<ResetPasswordPage />} />
          {/* <Route path="/admin/dashboard" element={<MainPage />} /> */}
          <Route path="/application/:id" element={<MainPage type='application' key={window.location.pathname} />} />
          <Route path="/users" element={<MainPage type='users' key={window.location.pathname}/>} />
          <Route path="/dogovorenergo" element={<MainPage type='dogovorenergo' key={window.location.pathname} />} />
          <Route path="/application/:id/dogovorenergo" element={<MainPage type='dogovorenergoEdit' key={window.location.pathname} />} />
          <Route path="/application/new" element={<MainPage type='newApplication' key={window.location.pathname} />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    
    </>
  )
}

export default observer(App);