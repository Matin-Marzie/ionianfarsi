import { Link } from "react-router-dom"

const Drop = ({ lesson, percentage }) => {
    return (
        <div className="relative flex justify-center">
            <Link className="io-drop flex rounded-[5%_50%_50%_50%] rotate-45 w-[100px] h-[100px] border-[3px] border-bluesea shadow-[4px_4px_0_0_#094c66] overflow-hidden"
                to={`/learn/lesson/${lesson.id}`}>

                {/* the percentage is ranged from  0 to 135*/}
                <div className={`absolute left-[-7px] bottom-[0px] w-[150%] rotate-[-45deg] bg-[url('../images/water.png')] bg-repeat-x bg-top animate-wave`}
                    style={{
                        height: `${20 + (115 * percentage) / 100}%`,
                        transition: 'height 0.5s ease-in'
                    }}
                ></div>
                <div className="text-lg rotate-[-45deg] absolute left-3 bottom-8 ">Lesson {lesson.id}</div>

            </Link>

            <span className="io-drop-shadow"></span>
        </div>
    )
}

export default Drop
