import React, {FC, useContext, useEffect, useState} from 'react';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage';
import TeamsPage from './pages/LoginPage';
import Header from './containers/Header';
import Footer from './containers/Footer';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import RequestForResetPasswordPage from './pages/RequestForResetPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const App: FC = () => {

  const {store} = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return (
      <>
      LOADING...
      </>
    )
  }

  return (
    <>
    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegistrationPage />} />
          <Route path="/request-for-reset" element={<RequestForResetPasswordPage />} />
          <Route path="/reset-password/:link" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    
    </>
  )
}

export default observer(App);