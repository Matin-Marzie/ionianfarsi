import api from "../api/api";
import useAuth from './UseAuth.js'

const UseRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await api.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }

    return refresh;
};

export default UseRefreshToken;