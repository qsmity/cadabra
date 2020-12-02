import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as CgIcons from 'react-icons/cg'

const Footer = ({ marginClass }) => {
    return (
        <div id='footer' className={marginClass}>
            <div className='cadabra-info'>
                <p className='footer-title'>About</p>
                <p >Cadabra is an Amazon-inspired E-commerce web application that retrieves and displays product information with a smooth and modernly designed user interface. Fun Fact: Did you know Amazon was to be called 'Cadabra' before it's official name back in 1995? </p>
            </div>
            <div >
                <p className='footer-title'>Site Links</p>
                <a href='https://github.com/qsmity/cadabra'>
                    <FaIcons.FaGithubSquare size='32px'/>
                </a>

            </div>
            <div >
                <p className='footer-title'>My Links</p>
                <a href='https://github.com/qsmity'>
                    <FaIcons.FaGithubSquare size='32px'/>
                </a>
                <a href='https://www.linkedin.com/in/quynn-smith-a442671bb/'>
                    <FaIcons.FaLinkedin size='32px'/>
                </a>
                <a href='https://www.quynnsmith.com'>
                    <CgIcons.CgWebsite size='32px'/>
                </a>
            </div>
        </div>
    )
}

export default Footer