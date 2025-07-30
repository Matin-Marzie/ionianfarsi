import api from './api.js'


// Get all users
export const getUsers = async (axiosInstance) => {
    const response = await axiosInstance.get("/api/users");
    return response.data;
};


// Login User
export const loginUser = async ({ username, password }) => {
    const response = await api.post(
        '/auth',
        JSON.stringify({ username, password }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }
    );
    return response.data;
};


// Create User (registeration)
export const createUser = async ({ name, username, password}) => {
    const response = await api.post(
                `/register`,
                JSON.stringify({ name, username,  password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
    return response;
}


// Update User
// export const updateUser = async (id, newData) => {...}

// Delete User
// export const deleteUser = async (id) => {...}
