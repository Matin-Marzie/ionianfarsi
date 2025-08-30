import { createContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getUser, updateUser } from "../api/UserApi";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const [auth, setAuth] = useState({});
  const isLoggedIn = !!auth?.accessToken;

  // Fetch user
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(axiosPrivate),
    enabled: isLoggedIn,
    keepPreviousData: true,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Update user
  const updateUserMutation = useMutation({
    mutationFn: (updates) => updateUser(axiosPrivate, updates),
    onSuccess: () => {
      // Refresh user data after successful update
      queryClient.invalidateQueries(["user"]);
    },
  });

  const defaultUser = {
    experience: 0,
    level: 'N',
    energy: 5,
    coin: 0,
    current_section: 1,
    current_unit: 1,
    current_repetition: 1,
    current_lesson: 1,
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isLoggedIn: !!auth?.accessToken,
        user: user ?? defaultUser,
        isLoading,
        error,
        updateUser: updateUserMutation.mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
