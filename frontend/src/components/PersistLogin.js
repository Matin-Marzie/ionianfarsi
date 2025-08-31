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
        if (err?.response) {
          // server responded with error
          if (err.response.status === 401) {
            console.log("Unauthorized (401)");
          } else {
            console.error("Server error:", err.response.status);
          }
        } else if (err?.request) {
          // request made but no response (server down, CORS, network)
          console.error("No response from server. Check backend or network.");
          alert("Server not responding. Please try again later.");
        } else {
          // something else (setup, code bug, etc.)
          console.error("Error setting up request:", err.message);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (!isLoggedIn) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return <Outlet />;
};

export default PersistLogin