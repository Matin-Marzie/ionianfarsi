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

      // Add reset flag here
      const userWithResetFlag = {
        ...response.data.user,
        reset_data: true, // <--- trigger user refresh logic in Practice
      };

      setAuth(prev => ({
        ...prev,
        accessToken: response.data.accessToken,
      }));

      // Save modified user to React Query cache
      queryClient.setQueryData(["user"], userWithResetFlag);

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
