import { axiosPrivate } from "../api/api";
import { useEffect } from "react";
import UseRefreshToken from "./UseRefreshToken";
import useAuth from "./UseAuth";

const useAxiosPrivate = () => {
    const refresh = UseRefreshToken();
    const { auth } = useAuth();

    // Didn't understand
    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                // First request attempt
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        // clean up function to remove interceptros
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;