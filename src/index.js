import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "./config/global"
import AuthContext from './Context/AuthContext';
import ReadProfileContext from 'Context/ReadProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


    <AuthContext>
      <ReadProfileContext>


    <BrowserRouter>
    <App />
    </BrowserRouter>
      </ReadProfileContext>
    </AuthContext>
  </React.StrictMode>
);


reportWebVitals();
