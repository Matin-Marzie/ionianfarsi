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
// import { Outlet } from "react-router-dom"
// import { useState, useEffect } from "react"
// import useRefreshToken from '../hooks/UseRefreshToken'
// import useAuth from "../hooks/UseAuth"

// const PersisLogin = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const refresh = useRefreshToken();
//     const auth = useAuth();

//     useEffect(() => {
//         const verifyRefreshToken = async () => {
//             try {
//                 await refresh();

//             }catch(err){
//                 console.error(err)
//             }finally{
//                 setIsLoading(false)
//             }
//         }

//         !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
//     }, [auth, refresh])


//     return(
//         <>
//             {isLoading
//                 ? <p>Loading...</p>
//                 : <Outlet />
//             }
//         </>
//     )
// }

// export default PersisLogin;