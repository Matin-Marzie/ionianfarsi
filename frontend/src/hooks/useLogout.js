import api from "../api/api"
import useAuth from "./UseAuth"

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await api.get('/logout', {withCredentials: true})
            console.log(response.status)
        }
        catch(err){
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;