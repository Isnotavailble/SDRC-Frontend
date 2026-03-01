import { useContext, useEffect, useState } from 'react';
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
import AdminMonitorResource from './MainPages/AdminPages/AdminMonitorResourcePage/AdminMonitorResource';

function App() {
  const { user } = useAuthContext();
  const l = useLocation();
  const isLogin = localStorage.getItem("user_token") ? true : false;
  const current_user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  useEffect(() => {
    console.log("user at ", l.pathname),
      [l.pathname]
  });

  return (
    <>
      <Routes>

        {/* Root Route: Redirects based on login status and role */}
        <Route path="/" element={
          !isLogin ? (
            <Navigate to="/login" replace />
          ) : current_user?.role === "admin" ? (
            <Navigate to="/admin/overview" replace />
          ) : current_user?.role === "responder" ? (
            <Navigate to="/responder/home" replace />
          ) : (
            <Navigate to="/login" replace /> // Safety fallback
          )
        } />

        {/*Auth process*/}
        <Route element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

        {/*Protected responder routes*/}
        <Route element={
          user.login && current_user.role === "responder" ?
            <ResponderMainLayout /> : <Navigate to={"/login"} />}
          path='responder'>
          <Route path='home' element={<ResponderMainPage />} />
        </Route>

        {/*Protected admin routes*/}
        <Route path="admin" element={
          user.login &&
            current_user.role === "admin" ?
            <AdminLayout /> : <Navigate to={"/login"} />}
        >
          <Route path="overview" element={<AdminOverviewPage />} />
          <Route path='responders' element={<AdminApprovalPage />} />
          <Route path='disasters' element={<AdminDisasterPage />} />
          <Route path='alerts' element={<AdminSendAlert />} />
          <Route path='resources' element={<AdminMonitorResource />} />
        </Route>

        {/* Fallback handler: Catches unknown URLs and sends them to the Root logic above */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
