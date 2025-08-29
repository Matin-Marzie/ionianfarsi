import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { getUsers } from "../../api/UserApi";
import useAuth from "../../hooks/UseAuth.js";

const Leaderboard = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const {
    data: users,
    isLoading,
    error
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(axiosPrivate),
    enabled: !!auth?.accessToken,   // <-- only fetch when logged in
    keepPreviousData: true,
    staleTime: 1000 * 60 * 4,       // 4 minutes
    cacheTime: 1000 * 60 * 60 * 24 * 2, // 2 days
  });

  if (!auth?.accessToken) return <div>You need to Login</div>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <div>
      <h2 className="text-3xl border-b-2 text-center p-3">Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id} className={`border flex justify-between p-4 ${user.id === auth.user.id ? "bg-bluesea text-white" : "bg-white"}`}>
              <h3>{user.username}</h3>
              <h3>{user.experience} xp</h3>
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
