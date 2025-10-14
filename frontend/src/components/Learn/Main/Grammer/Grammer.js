import { useContext } from 'react';
import LessonContext from '../../../../context/LessonContext';
import { FaArrowLeft } from 'react-icons/fa';


function Grammer (){

    const { setLearnPageIndex, setLearnPageScrollDirection } = useContext(LessonContext);


    return (
        <div className="w-full h-full bg-white px-2 flex flex-col">


            <div className="w-full m-auto sticky top-0 z-20 flex">
            
                            {/* ⬅️ */}
                            <div className="io-button-not-rounded bg-bluesea rounded-tl-2xl rounded-bl-2xl px-2 flex items-center"
                                onClick={() => {
                                    setTimeout(() => {
                                        setLearnPageScrollDirection(-1)
                                        setLearnPageIndex((prev => prev - 1))
                                    },)
                                }}>
                                <FaArrowLeft />
                            </div>
            
                            {/* Button to sections page overview */}
                            <div to='sections' className='io-button-not-rounded bg-bluesea p-1 flex-grow border-x-[1px] flex flex-col text-center'>
                                <h5>MY</h5>
                                <h5>Grammer</h5>
                            </div>

                        </div>

            <h2 className="flex-grow flex"> This page is under developement</h2>
        </div>


    )
}

export default Grammer;