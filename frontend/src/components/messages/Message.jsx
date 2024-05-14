import React from 'react'

const Message = () => {
    return (
        <div className={`chat chat-end`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Tailwind CSS chat bubble component' src={`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`} />
                </div>
            </div>
            <div className={`chat-bubble text-white bg-blue-500 pb-2`}>Hi! what is up?</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
        </div>
    )
}

export default Message