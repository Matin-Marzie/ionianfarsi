import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import UseRefreshToken from '../hooks/UseRefreshToken';

// When applicatin mounts, it tries to refresh, if response message is 'No jwt cookie' then user is considered as logged out.
const PersistLogin = () => {
  const { isLoggedIn } = useAuth();

  const refresh = UseRefreshToken();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        
        if(err.response.status === 401){}
        console.error('Refresh token failed', err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // If no accessToken, try refresh
    if (!isLoggedIn) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => isMounted = false;

  // eslint-disable-next-line
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return <Outlet />;
};

export default PersistLogin