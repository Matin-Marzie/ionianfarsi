import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect, useMemo } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { getUsers } from "../../api/UserApi";
import useAuth from "../../hooks/UseAuth.js";
import { Link } from "react-router-dom";

const Leaderboard = ({ publicUser }) => {
  const { isLoggedIn, user } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  // Scroll to user in leaderBoard
  const userRef = useRef(null);

  // Fetch all users
  const { data: allUsers, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(axiosPrivate),
    enabled: !publicUser && isLoggedIn, // only fetch all if no publicUser
    keepPreviousData: true,
    staleTime: 1000 * 60 * 4,
    cacheTime: 1000 * 60 * 60 * 24 * 2,
  });

  // derive the "users" list depending on mode(me or publichUser)
  const users = useMemo(() => {
    if (publicUser) {
      // deduplicate: if publicUser === user, only keep one
      // current user watching it's publicUser
      if (publicUser.id === user?.id) return [user];
      return [user, publicUser].filter(Boolean);
    }
    return allUsers || [];
  }, [allUsers, publicUser, user]);

  // Scroll to the current user
  useEffect(() => {
    if (userRef.current) {
      userRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [users]);

  if (!isLoggedIn) return <div>You need to Login</div>;
  if (!publicUser && isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <div className="flex-grow overflow-auto max-h-[70vh]">
      {users?.length ? (
        <ul>
          {[...users] // copy array so we don’t mutate react-query cache
            .sort((a, b) => b.experience - a.experience) // descending by xp
            .map((userInBoard) => (
              <li
                key={userInBoard.id}
                ref={userInBoard.id === user?.id ? userRef : null}
                className={`border-y ${userInBoard.id === user?.id
                    ? "bg-bluesea text-white"
                    : "bg-white"
                  }`}
              >
                {/* Visit other users public page */}
                <Link
                  className="flex justify-between p-4 items-center"
                  to={`/profile/${userInBoard.username}`}
                >
                  <h3 className="flex items-center gap-2">
                    <img
                      src={`${userInBoard.profile_picture_url ?? '/profile.png'}`}
                      alt="profile avatar"
                      className="w-[40px] h-[40px] rounded-full border-2 border-gray-300"
                    />
                    {userInBoard.username}
                  </h3>
                  <h3>{userInBoard.experience} xp</h3>
                </Link>
              </li>
            ))}
        </ul>

      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};

export default Leaderboard;
