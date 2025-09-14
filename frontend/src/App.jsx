import { useState } from 'react';
import "tailwindcss";
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/ui/Home';
import Login from './components/ui/Login';
import Signup from './components/ui/Signup';
import { Toaster } from "@/components/ui/sonner"

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
    </>
  );
}

export default App;
