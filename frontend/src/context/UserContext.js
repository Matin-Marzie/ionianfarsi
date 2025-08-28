import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/UserApi";
import useAuth from "../hooks/UseAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { auth } = useAuth();          // get user login state
  const isLoggedIn = !!auth?.accessToken;

  const axiosPrivate = useAxiosPrivate();

  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(axiosPrivate),
    enabled: isLoggedIn,               // only fetch if logged in
    staleTime: Infinity,
  });

  const refreshUser = () => refetch();

  return (
    <UserContext.Provider value={{ user, isLoading, error, refreshUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
