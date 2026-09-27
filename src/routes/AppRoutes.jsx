import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import SplashScreen from '../pages/SplashScreen.jsx';
import Login from '../pages/Login.jsx';
import SignUp from '../pages/SignUp.jsx';

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
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
