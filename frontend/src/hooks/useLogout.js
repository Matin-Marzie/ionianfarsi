import { useQueryClient } from "@tanstack/react-query";
import api from "../api/api"
import useAuth from "./UseAuth"


const useLogout = () => {
    const queryClient = useQueryClient();
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await api.get('/logout', { withCredentials: true })

            if (response.status === 204) {
                queryClient.clear(); // 🔥 clears all react-query caches
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;