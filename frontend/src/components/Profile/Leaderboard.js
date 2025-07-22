import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

const Leaderboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return; // ignore abort errors
      }
    };

    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  return (
    <section className="flex-grow h-full">
      <h2 className="text-3xl border-b-2 text-center p-3">Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border flex justify-between">
              <h3>{user?.username}</h3>
              <h3>{user?.experience} xp</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>No user found.</p>
      )}
    </section>
  );
};

export default Leaderboard;
