import s from './ChatStyles/MessageStyle.module.css'

import ChatContextMenu from './ChatContextMenu';
import { useState } from 'react';

const Message = (props) => {

    const { from, message } = props.message;
    const previous_message = props.previous_message
    const user_login = window.localStorage.getItem('login');
    const check_author = user_login === from;
    const previous_user = previous_message ? from === previous_message.from : false;

    const [viewContextMenu, setViewContextMenu] = useState(false)

    const openContextMenu = () => {
        setViewContextMenu(!viewContextMenu)
    }



    return (
        <div className={s.wrapper} style={{
            justifyContent: check_author ? 'end' : 'start',
            flexDirection: check_author ? 'row' : 'row-reverse',
        }} onClick={openContextMenu}>

            <ChatContextMenu check_author={check_author} message={props.message} socket={props.socket} 
                viewContextMenu={viewContextMenu} setViewContextMenu={openContextMenu}/>

            <div className={s.message} style={{
                background: check_author ? '#e9edc9' : '#FFFFFF', //ffee32
            }}>
                <p className={s.user_name} style={{
                    display: previous_user ? 'none':'block',
                    color: '#1C1B1F'
                }}>{from}</p>
                <p className={s.message_text} style={{
                    color: '#1C1B1F'
                }}>{message}</p>
            </div>
        </div>
    )
}

export default Message