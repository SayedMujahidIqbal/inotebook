import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';


const router = createBrowserRouter([  
  {
    path:"/",
    element: <><App /><Home /></> 
  },
  {
    path:"/about",
    element: <><App /> <About /></>
  },
  {
    path:"/login",
    element: <><App /> <Login /></>
  },
  {
    path:"/signup",
    element: <><App /> <Signup /></>
  },
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <NoteState>
          <RouterProvider router={router} />
      </NoteState>
  </React.StrictMode>
);

