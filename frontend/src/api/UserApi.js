import api from './api.js'

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
export const createUser = async ({ name, username, password }) => {
    const response = await api.post(
        `/register`,
        JSON.stringify({ name, username, password }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }
    );
    return response;
}


// Get all users
export const getUsers = async (axiosInstance) => {
    const response = await axiosInstance.get("/api/users");
    return response.data;
};

export const getUserPublic = async (username) =>{
    const response = await api.get(`/api/users/${username}`)
    return response.data;
}

// Get user/my private info
export const getUser = async (axiosInstance) => {
    const response = await axiosInstance.get("/api/users/me");
    return response.data;
}


// Update User
export const updateUser = async (id, newData) => {
    return;
}

// Delete User
export const deleteUser = async (id) => {
    return;
}
