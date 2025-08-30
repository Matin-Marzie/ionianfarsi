import { useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import useAuth from './UseAuth.js'

const UseRefreshToken = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await api.get('/refresh', {
        withCredentials: true
      });

      setAuth(prev => {
        return { ...prev, accessToken: response.data.accessToken }
      });

      queryClient.setQueryData(["user"], response.data.user);

      return response.data.accessToken;

    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message;
      
      // Case 1: no JWT cookie = user is not logged in, just clear auth and return null
      if (status === 401 && message === "No jwt cookie") {
        setAuth({});
        return null;
      }

      // Case 2: refresh token expired or invalid
      if (status === 401 || status === 403) {
        setAuth({});
        throw err; //important: notify axiosPrivate
      }

      // Case 3: some other error (network, server, etc.)
      throw err;
    }
  }

  return refresh;
};

export default UseRefreshToken;
