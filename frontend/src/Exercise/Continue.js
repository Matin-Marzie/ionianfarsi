import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Continue({ displayContinue }) {
    // Display Continue container when exercises complited
    const [ScreenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        // Find screen width
        const parentDiv = document.querySelector('.practice-container');
        if (parentDiv) {
            setScreenWidth(parentDiv.offsetWidth);
        }
    }, [ScreenWidth])

    return (
        <div className='continue-container text-center' style={{ width: `${ScreenWidth}px`, display: `${displayContinue}` }}>
            <p className='my-3 fs-2'>
                Well Done!
            </p>
            <Link className='io-button fs-2' to={'./..'}>
                Continue
            </Link>
        </div>
    )
}

export default Continue