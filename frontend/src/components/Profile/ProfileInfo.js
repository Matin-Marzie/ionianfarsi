import useAuth from "../../hooks/UseAuth";
import { IoIosBookmarks } from "react-icons/io";

const ProfileInfo = () => {
    const { user } = useAuth();

    return (
        <div className="bg-white px-2">
            <h1 className="font-bold text-xl">{user?.name}</h1>
            <div className=" shadow-md rounded-2xl gap-6 flex border-t-">
                {/* Left side - user info */}
                <ul className="flex flex-grow text-gray-700 text font-medium justify-evenly items-center border-t-[1px]">
                    <li className="flex flex-col">
                        <span className=''>{user?.level ?? "N"} 🇮🇷</span>
                        <h3 className="">Level</h3>
                    </li>
                    <li className="flex flex-col">
                        <span className=''>{user?.experience ?? 0} <span className='text-green-500 font-bold'>XP</span></span>
                        <h3 className="">Experience</h3>
                    </li>
                    <li className="flex flex-col">
                        <span className='flex items-center'>{user?.current_unit ?? 1}<IoIosBookmarks /></span>
                        <h3 className="">Unit</h3>
                    </li>
                </ul>

                {/* Right side - avatar & username */}
                <div className="flex flex-col items-center">
                    <img
                        src="/profile.png"
                        alt="profile avatar"
                        className="w-[100px] rounded-[50%_0%_50%_50%] border-2 border-gray-300"
                    />
                    <h2 className="text-lg font-medium text-gray-800">
                        @{user?.username ?? "Guest"}
                    </h2>
                </div>
            </div>
            <h6>Member since: {new Date(user.joined_date).getFullYear()}</h6>
        </div>
    );
};

export default ProfileInfo;
