import React from 'react'
import cadabraBlackFriday from '../images/cadabraBlackFriday.png'

const Homepage = () => {
    return (
        <div className='homepage-background-container'>
            <div className='homepage-background-primary'>
                <img src={cadabraBlackFriday}></img>
            </div>
            <div className='homepage-background-secondary'>
            </div>
        </div>
    )
}

export default Homepage;