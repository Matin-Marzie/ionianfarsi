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


  // Default user for guests
  const defaultUser = {
    name: "guest user",
    username: "Guest",
    email: "guest@example.com",
    experience: 0,
    level: 'N',
    coin: 0,
    energy: 5,
    profile_picture_url: "/profile.png",
    joined_date: new Date().toISOString(),

    section: {
      section_id: 1,
      title: 'Play with Letters, Dance with Words!',
      description: 'Learn the Alphabet and many words.',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Farsi.svg/1280px-Farsi.svg.png',
      level: 'N'
    },

    unit: {
      unit_id: 1,
      unit_order: 1,
    },

    repetition: {
      repetition_id: 1,
      repetition_order: 1,
    },

    lesson: {
      lesson_id: 1,
      lesson_order: 1,
      lesson_title: "lesson with challenges",
    },

    // Flag to reset user unit, repetition, lesson data on Practice page
    reset_data: true,
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
        setUser: (newUser, syncBackend=false) => {
          queryClient.setQueryData(["user"], () => newUser);

          // sync with backend if user logged in
          if (!!auth?.accessToken && syncBackend) {
            updateUserMutation.mutate({
              experience: newUser.experience,
              // level: newUser.level,
              // coin: newUser.coin,
              // energy: newUser.energy,
              section_id: newUser.section?.section_id,
              unit_id: newUser.unit?.unit_id,
              repetition_id: newUser.repetition?.repetition_id,
              lesson_id: newUser.lesson?.lesson_id,
            });
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;