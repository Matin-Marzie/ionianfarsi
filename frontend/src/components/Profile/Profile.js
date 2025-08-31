import ProfileInfo from "./ProfileInfo";
import Leaderboard from "./Leaderboard";
import AuthPanel from "./AuthPanel";

const Profile = () => {

  return (
    <section className="flex-grow h-full w-full max-w-screen-md m-auto flex flex-col bg-white">
      <ProfileInfo />
      <h2 className="text-xl border-b-2 pt-3">Ranks:</h2>
      <Leaderboard />
      <AuthPanel />
    </section>
  )
}

export default Profile