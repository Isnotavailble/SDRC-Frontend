import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css'
import AuthLayout from './layout/AuthLayout/AuthLayout';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';

function App() {


  return (
    <>
      <Routes>
        {/*Auth process*/}
        <Route element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
