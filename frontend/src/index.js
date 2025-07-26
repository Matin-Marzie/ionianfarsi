import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvidor } from './context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvidor>
        <App />

      </AuthProvidor>
    </QueryClientProvider>
  </React.StrictMode>
);
