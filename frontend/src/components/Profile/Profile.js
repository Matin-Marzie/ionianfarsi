import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/UseAuth";
import { getUser } from "../../api/UserApi";

import ProfileInfo from "./ProfileInfo";
import Leaderboard from "./Leaderboard";
import AuthPanel from "./AuthPanel";

const Profile = () => {

  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(axiosPrivate),
    enabled: !!auth?.accessToken,   // <-- only fetch when logged in
    keepPreviousData: true,
    staleTime: 1000 * 60 * 4,       // 4 minutes
    cacheTime: 1000 * 60 * 60 * 24 * 2, // 2 days
    onSuccess: (user) => {
      // sync context
      setAuth(prev => ({ ...prev, user }));
    }
  });

  return (
    <section className="flex-grow h-full w-full max-w-screen-md m-auto flex flex-col bg-white">
      <ProfileInfo />
      <Leaderboard />
      <AuthPanel />
    </section>
  )
}

export default Profile