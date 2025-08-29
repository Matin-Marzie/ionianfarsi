import useAuth from "../../hooks/UseAuth"


const ProfileInfo = () => {
    const { auth } = useAuth();
    return (
        <h1>username: {auth?.user?.username}</h1>
    )
}

export default ProfileInfo
