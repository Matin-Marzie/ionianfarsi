import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserPublic } from "../../api/UserApi"; // you'll need this
import ProfileInfo from "./ProfileInfo";
import Leaderboard from "./Leaderboard";
import useAuth from "../../hooks/UseAuth";

const PublicProfile = () => {
  const { username } = useParams();
  const {user} = useAuth();

  const {
    data: publicUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["publicUser", username],
    queryFn: () => getUserPublic(username),
    enabled: !!username,
  });

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile.</p>;

  return (
    <div className="flex-grow h-full w-full max-w-screen-md m-auto flex flex-col bg-white">
      <ProfileInfo PublicUser={publicUser} />
      <h2 className="text-xl border-b-2 pt-3 pl-1">Ranks:</h2>
      <Leaderboard publicUser={publicUser} />
    </div>
  );
};

export default PublicProfile;
