import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import UseRefreshToken from '../hooks/UseRefreshToken';

const PersistLogin = () => {
  const { auth } = useAuth();
  const refresh = UseRefreshToken();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error('Refresh token failed', err);
      } finally {
        setIsLoading(false);
      }
    };

    // If no accessToken, try refresh
    if (!auth?.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  // eslint-disable-next-line
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return <Outlet />;
};

export default PersistLogin