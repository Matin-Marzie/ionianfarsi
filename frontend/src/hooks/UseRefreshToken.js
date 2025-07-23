import api from "../api/api";
import useAuth from './UseAuth.js'

const UseRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await api.get('/refresh', {
        withCredentials: true
      });

      setAuth(prev => {
        return { ...prev, accessToken: response.data.accessToken }
      });

      return response.data.accessToken;

    } catch (err) {
      if (err.response?.status === 403) {
        // Refresh token expired or invalid — logout needed
        console.log(' refresh 403')
        // setAuth({});
        throw err;  // important: throw to notify useAxiosPrivate
      }
      throw err; // rethrow other errors
    }
  }

  return refresh;
};

export default UseRefreshToken;
