import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { getUsers } from "../../api/UserApi";
import useAuth from "../../hooks/UseAuth.js";

const Leaderboard = () => {
  const { isLoggedIn, user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const userRef = useRef(null);

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(axiosPrivate),
    enabled: isLoggedIn,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 4,
    cacheTime: 1000 * 60 * 60 * 24 * 2,
  });

  useEffect(() => {
    if (userRef.current) {
      userRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [users]);

  if (!isLoggedIn) return <div>You need to Login</div>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <div className="flex-grow overflow-auto max-h-[70vh]">
      {users?.length ? (
        <ul>
          {users.map((userInBoard) => (
            <li
              key={userInBoard.id}
              ref={userInBoard.id === user?.id ? userRef : null}
              className={`border-y flex justify-between p-4 items-center ${
                userInBoard.id === user?.id ? "bg-bluesea text-white" : "bg-white"
              }`}
            >
              <h3 className="flex items-center gap-2"><img src={"/profile.png"}
                        alt="profile avatar"
                        className="w-[40px] h-[40px] rounded-full border-2 border-gray-300" />
                        {userInBoard.username}</h3>
              <h3>{userInBoard.experience} xp</h3>
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
