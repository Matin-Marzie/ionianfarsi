import useAuth from "../../hooks/UseAuth"


const ProfileInfo = () => {
    const { user } = useAuth();
    return (
        <h1>username: {user?.username}</h1>
    )
}

export default ProfileInfo
