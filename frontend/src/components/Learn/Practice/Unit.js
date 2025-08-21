import { Link } from "react-router-dom"
import Repetition from "./Repetition"

const Unit = ({ unit, currentSection }) => {
    return (
        <article
            className="px-2 flex flex-col bg-white"
        >
            <Link to='sections' className='bg-bluesea io-button p-4 sticky top-4 z-20'>
                <h5>Section {currentSection} — Unit {unit.unit_order}</h5>
                <h5>{unit.unit_title}</h5>
            </Link>

            {/* Repetitions */}
            <div className="grid grid-cols-12 items-start pt-10 mb-8 h-full min-h-[calc(100dvh-146px)] flex-grow gap-y-12">
                {unit.repetitions.map((rep, i) => {
                    let colClass = "";
                    switch (i) {
                        case 0: colClass = "col-start-3 col-span-4 xs:col-start-3 xs:col-span-4"; break;     
                        case 1: colClass = "col-start-7 col-span-4 xs:col-start-7 xs:col-span-4"; break;     

                        case 2: colClass = "col-start-9 col-span-4 xs:col-start-10 xs:col-span-3"; break;

                        case 3: colClass = "col-start-3 col-span-4 xs:col-start-3 xs:col-span-4"; break;     
                        case 4: colClass = "col-start-7 col-span-4 xs:col-start-7 xs:col-span-4"; break;     

                        case 5: colClass = "col-start-1 col-span-4 xs:col-start-1 xs:col-span-3"; break;     

                        case 6: colClass = "col-start-3 col-span-4 xs:col-start-3 xs:col-span-4"; break;
                        case 7: colClass = "col-start-7 col-span-4 xs:col-start-7 xs:col-span-4"; break;     

                        case 8: colClass = "col-start-9 col-span-4 xs:col-start-10 xs:col-span-3"; break;     

                        case 9: colClass = "col-start-7 col-span-4 xs:col-start-7 xs:col-span-4"; break;
                        default: colClass = "";                      
                    }

                    return (
                        <div key={rep.repetition_order} className={`${colClass}`}>
                            <Repetition repetition={rep} />
                        </div>
                    );
                })}
            </div>



        </article>
    )
}

export default Unit