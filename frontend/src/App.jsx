import { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/ui/Home';
import Login from './components/ui/Login';
import Signup from './components/ui/Signup';

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

function App() {
  return (
    <div>
      <Button>Hello</Button>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
