import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import './App.css'
import AuthLayout from './layout/AuthLayout/AuthLayout';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import ResponderMainLayout from "./layout/ResponderMainLayout/ResponderMainLayout";
import ResponderMainPage from './MainPages/ResponderMainPage/ResponderMainPage';
import { useAuthContext } from './AuthContext/AuthContextProvider';

function App() {
  const {user} = useAuthContext();
  const l = useLocation();
  
  useEffect(() => {console.log("user at ",l.pathname ),[l.pathname]});
  return (
    <>
      <Routes>
        {/*Auth process*/}
        <Route element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
        
        {/*Protected routes*/}
        <Route element={
          localStorage.getItem("is_login") === "true" ?
            <ResponderMainLayout /> : <Navigate to={"/login"} />}
          path='responder'>

          <Route path='centre' element={<ResponderMainPage />} />

        </Route>

      </Routes>

    </>
  )
}

export default App
