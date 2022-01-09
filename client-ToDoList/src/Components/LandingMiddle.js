import React from 'react'
import illustration from '../assets/illustration.png'

const LandingMiddle = () => {
    return (
        <div className="middle-wrapper body-item">
            <div className="app-motto">
                <h1>Experience a fluid UI.</h1>
                <h1>Improve with analytics.</h1>
                <h1>Strike off your <span>todos</span>!</h1>
            </div>
            <div className="illustration">
                <img src={illustration} alt="" />
            </div>
        </div>
    )
}

export default LandingMiddle;
