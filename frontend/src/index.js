import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvidor } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvidor>
      <App />
    </AuthProvidor>
  </React.StrictMode>
);
