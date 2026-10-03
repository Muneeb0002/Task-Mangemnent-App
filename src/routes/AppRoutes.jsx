import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import SplashScreen from '../pages/SplashScreen.jsx';
import Login from '../pages/Login.jsx';
import SignUp from '../pages/SignUp.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';
import TaskBoard from '../pages/TaskBoard.jsx';

// Define application routes using createBrowserRouter
export const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/dashboard',
    element: <TaskBoard />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
