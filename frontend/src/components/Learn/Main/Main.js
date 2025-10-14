import { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Vocabulary from './Vocabulary/Vocabulary.js'
import Practice from './Practice/Practice.js'
import Grammer from './Grammer/Grammer.js'
import LessonContext from "../../../context/LessonContext.js";

const pageComponents = [<Vocabulary />, <Practice />, <Grammer />];

const Main = () => {

    const { 
        learnPageIndex, setLearnPageIndex,
        learnPageScrollDirection, setLearnPageScrollDirection,
     } = useContext(LessonContext);
    
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const pointerStartX = useRef(null);
    const isScrolling = useRef(false);


    useEffect(() => {
        const timer = setTimeout(() => setIsFirstLoad(false), 500);
        return () => clearTimeout(timer);
    }, []);


    // Navigate on pages with two-finger laptop touch
    const handleWheel = (e) => {
        const deltaX = e.deltaX;

        if (isScrolling.current) return; // ignore if already scrolling
        if (Math.abs(deltaX) < 50) return; // ignore small scrolls

        isScrolling.current = true;

        if (deltaX > 0 && learnPageIndex < pageComponents.length - 1) {
            setLearnPageScrollDirection(1);
            setLearnPageIndex((prev) => prev + 1);
        } else if (deltaX < 0 && learnPageIndex > 0) {
            setLearnPageScrollDirection(-1);
            setLearnPageIndex((prev) => prev - 1);
        }

        setTimeout(() => {
            isScrolling.current = false;
        }, 500); // adjust delay to match animation time
    };


    const handleStart = (x) => {
        pointerStartX.current = x;
    };

    const handleEnd = (x) => {
        const deltaX = x - pointerStartX.current;

        if (deltaX > 100 && learnPageIndex > 0) {
            setLearnPageScrollDirection(-1);
            setLearnPageIndex((prev) => prev - 1);
        } else if (deltaX < -100 && learnPageIndex < pageComponents.length - 1) {
            setLearnPageScrollDirection(1);
            setLearnPageIndex((prev) => prev + 1);
        }
    };

    const variants = {
        enter: (dir) => ({
            x: isFirstLoad ? 0 : dir > 0 ? "100dvw" : "-100dvw",
            transition: { duration: 0.2 },
            opacity: 1,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: isFirstLoad ? 0 : 0.2 },
        },
        exit: (dir) => ({
            x: dir < 0 ? "100dvw" : "-100dvw",
            transition: { duration: 0.2 },
            opacity: 1,
        }),
    };


    return (
        <div
            className="flex-grow flex flex-col w-full text-xl overflow-scroll"
            onWheel={handleWheel}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseUp={(e) => handleEnd(e.clientX)}
        >
            <div className="relative w-full flex-grow">
                <AnimatePresence custom={learnPageScrollDirection} mode="popLayout">
                    <motion.div
                        key={learnPageIndex}
                        custom={learnPageScrollDirection}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: isFirstLoad ? 1 : 0.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {pageComponents[learnPageIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Main
