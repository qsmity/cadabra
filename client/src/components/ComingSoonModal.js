import React from 'react'

const ComingSoonModal = ({ hidePopup }) => {

    //handle close click for modal
    const close = (e) => {
        hidePopup()
    }

    return (
        <div className='edit-overlay'>
            <div className='popup'>
                <div className='popup-info'>
                    <div>
                        <h2> Cart and Buying Feature</h2>
                        <h3> Coming Soon...</h3>
                    </div>
                    <button variant='contained' onClick={close} className='edit-ticket-close'>exit</button>
                </div>

            </div>
        </div>
    )
}

export default ComingSoonModal;