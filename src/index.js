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


const router = createBrowserRouter([  
  {
    path:"/",
    element: <><App /><Home /></> 
  },
  {
    path:"/about",
    element: <><App /> <About /></>
  }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <NoteState>
          <RouterProvider router={router} />
      </NoteState>
  </React.StrictMode>
);

