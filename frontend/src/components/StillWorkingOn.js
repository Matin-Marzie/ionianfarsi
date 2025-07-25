import React from 'react'
import '../css/StillWorkingOn.css';

function StillWorkingOn() {
    // When we have not developed the page, we show an animation of a programmer working on
    return (
        <div className="skeleton-loader">
            <div className='loader'></div>
            <div className="error404page">
                <div className="newcharacter404">
                    <div className="chair404"></div>
                    <div className="leftshoe404"></div>
                    <div className="rightshoe404"></div>
                    <div className="legs404"></div>
                    <div className="torso404">
                        <div className="body404"></div>
                        <div className="leftarm404"></div>
                        <div className="rightarm404"></div>
                        <div className="head404">
                            <div className="eyes404"></div>
                        </div>
                    </div>
                    <div className="laptop404"></div>
                </div>
            </div>
        </div>
    )
}

export default StillWorkingOn