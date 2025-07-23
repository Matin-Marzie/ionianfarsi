import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import UseRefreshToken from '../hooks/UseRefreshToken';

const PersistLogin = () => {
  const { auth } = useAuth();
  const refresh = UseRefreshToken();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      setIsRefreshing(true);
      try {
        await refresh();
      } catch (err) {
        console.error('Refresh token failed', err);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    };

    // If no accessToken, try refresh
    if (!auth?.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <p>Loading...</p>; // or a spinner

  // If no accessToken after refresh, redirect to login
  if (!auth?.accessToken && !isRefreshing) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PersistLogin;
