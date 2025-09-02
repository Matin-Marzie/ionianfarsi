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
    name: "guest user",
    username: "Guest",
    email: "guest@example.com",
    experience: 0,
    level: 'N',
    coin: 0,
    energy: 5,
    profile_picture_url: "/profile.png",
    section_id: 1,
    unit_id: 1,
    repetition_id: 1,
    lesson_id: 1,
    joined_date: new Date().toISOString()
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
