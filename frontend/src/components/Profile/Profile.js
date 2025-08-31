import ProfileInfo from "./ProfileInfo";
import Leaderboard from "./Leaderboard";
import AuthPanel from "./AuthPanel";

const Profile = () => {

  return (
    <section className="flex-grow h-full w-full max-w-screen-md m-auto flex flex-col bg-white">
      <ProfileInfo />
      <Leaderboard />
      <AuthPanel />
    </section>
  )
}

export default Profile