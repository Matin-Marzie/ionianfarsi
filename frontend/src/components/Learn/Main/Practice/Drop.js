import { Link } from "react-router-dom";
import { IoVideocam } from "react-icons/io5";
import { TbPlaystationTriangle, TbPlaystationCircle, TbPlaystationX, TbPlaystationSquare } from "react-icons/tb";

const Drop = ({ repetition, repetition_type, percentage, isCurrentRepetition }) => {

    return (
        <div className="relative flex justify-center">
            <Link className={`${isCurrentRepetition ? 'io-drop' : ''} io-button-float flex rounded-[5%_50%_50%_50%] rotate-45 w-[80px] h-[80px] border-[3px] border-bluesea shadow-[4px_4px_0_0_#094c66] overflow-hidden`}
                to={`/learn/lesson/${repetition.lessons[0].lesson_id}`}>

                {/* the percentage is ranged from  0 to 135*/}
                <div className={`absolute left-[-7px] bottom-[0px] w-[150%] rotate-[-45deg] ${percentage !== -1 ? "bg-[url('../images/water.png')] bg-repeat-x bg-top animate-wave" : ''}`}
                    style={{
                        height: `${20 + (115 * percentage) / 100}%`,
                        // height: `${20 + (115 * 100) / 100}%`,
                        transition: 'height 0.5s ease-in'
                    }}
                ></div>
                <div className="text-[55px] rotate-[-45deg] absolute left-3 bottom-1.5">
                    {/* Depending on repetition_type display appropriate icon */}
                    {repetition_type === 'watch_video' ? (<IoVideocam className="text-[46px] ml-1.5 mb-1.5"/>) :
                        repetition_type === 'challenges_repetition_1' ? (<TbPlaystationTriangle className="text-green-800"/>) :
                        repetition_type === 'challenges_repetition_2' ? (<TbPlaystationCircle className="text-red-600"/>) :
                        repetition_type === 'challenges_repetition_3' ? (<TbPlaystationX className="text-cyan-900"/>) :
                        repetition_type === 'challenges_repetition_4' ? (<TbPlaystationSquare className="text-pink-300"/>) :
                         'no icon'}
                </div>

            </Link>

            <span className={`${isCurrentRepetition ? 'io-drop-shadow' : ''}`}></span>
        </div>
    )
}

export default Drop
