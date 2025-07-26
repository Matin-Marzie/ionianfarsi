import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

const Leaderboard = () => {
  const axiosPrivate = useAxiosPrivate();

  const {
    data: users,
    isLoading,
    error
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/users");
      return response.data;
    },
    keepPreviousData: true,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <>
      <h2 className="text-3xl border-b-2 text-center p-3">Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border flex justify-between">
              <h3>{user.username}</h3>
              <h3>{user.experience} xp</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>No user found.</p>
      )}
    </>
  );
};

export default Leaderboard;
