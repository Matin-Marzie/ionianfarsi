import { FaArrowLeft } from 'react-icons/fa';
import useAuth from "../../hooks/UseAuth";
import { FaBook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({ PublicUser }) => {
    const { user: authUser } = useAuth();

    const navigate = useNavigate();

    // pick PublicUser if defined, otherwise fallback to auth user
    const user = PublicUser ?? authUser;

    return (
        <div className="bg-white px-2">
            <div className='flex gap-2 items-center'>
                <button className={`${!PublicUser ? 'hidden' : ''}`} onClick={()=>navigate(-1)}>
                    <FaArrowLeft className='text-bluesea text-2xl md:text-2xl font-bold' />
                </button>
                <h1 className="font-bold text-xl">{user?.name}</h1>
            </div>
            <div className=" shadow-md rounded-2xl gap-6 flex border-t-">
                {/* Left side - user info */}
                <ul className="flex flex-grow text-gray-700 text font-medium justify-evenly items-center border-t-[1px]">
                    <li className="flex flex-col">
                        <span className=''>{user?.level ?? "N"} 🇮🇷</span>
                        <h3 className="">Level</h3>
                    </li>
                    <li className="flex flex-col">
                        <span className=''>{user?.experience} <span className='text-green-500 font-bold'>XP</span></span>
                        <h3 className="">Experience</h3>
                    </li>
                    <li className="flex flex-col">
                        <span className='flex items-center gap-1'>{user?.current_unit ?? 1} <FaBook className='text-red-500' /></span>
                        <h3 className="">Unit</h3>
                    </li>
                </ul>

                {/* Right side - avatar & username */}
                <div className="flex flex-col items-center">
                    <img
                        src={`${user.profile_picture_url ?? '/profile.png'}`}
                        alt="Error loading profile"
                        className="w-[100px] h-[100px] rounded-[50%_0%_50%_50%] border-2 border-gray-300 text-center"
                    />
                    <h2 className="text-lg font-medium text-gray-800">
                        @{user?.username ?? "Guest"}
                    </h2>
                </div>
            </div>
            <h6 className='pl-3'>Member since: {new Date(user.joined_date).getFullYear()}</h6>
        </div>
    );
};

export default ProfileInfo;
