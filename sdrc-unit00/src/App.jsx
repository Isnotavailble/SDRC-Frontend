import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import './App.css'
import AuthLayout from './layout/AuthLayout/AuthLayout';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import ResponderMainLayout from "./layout/ResponderMainLayout/ResponderMainLayout";
import ResponderMainPage from './MainPages/ResponderMainPage/ResponderMainPage';
import { useAuthContext } from './AuthContext/AuthContextProvider';
import AdminOverviewPage from './MainPages/AdminPages/AdminOverviewPage/AdminOverviewPage';
import AdminApprovalPage from './MainPages/AdminPages/AdminApprovalPage/AdminApprovalPage';
import AdminDisasterPage from './MainPages/AdminPages/AdminMonitorDisasterPage/AdminDisasterPage';
import AdminSendAlert from './MainPages/AdminPages/AdminSendAlertPage/AdminSendAlert';
import AdminLayout from './layout/AdminLayout/AdminLayout';

function App() {
  const { user } = useAuthContext();
  const l = useLocation();

  useEffect(() => { console.log("user at ", l.pathname), [l.pathname] });
  return (
    <>
      <Routes>
        {/*Auth process*/}
        <Route element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

        {/*Protected responder routes*/}
        <Route element={
          localStorage.getItem("is_login") === "true" && localStorage.getItem("user_role") === "responder" ?
            <ResponderMainLayout /> : <Navigate to={"/login"} />}
          path='responder'>
          <Route path='home' element={<ResponderMainPage />} />
        </Route>

        {/*Protected admin routes*/}
        <Route path="admin" element={
          localStorage.getItem("is_login") === "true" &&
            localStorage.getItem("user_role") === "admin" ?
            <AdminLayout /> : <Navigate to={"/login"} />}
        >
          <Route path="overview" element={<AdminOverviewPage />} />
          <Route path='responders' element={<AdminApprovalPage />} />
          <Route path='disasters' element={<AdminDisasterPage />} />
          <Route path='alerts' element={<AdminSendAlert />} />
        </Route>


      </Routes>

    </>
  )
}

export default App
