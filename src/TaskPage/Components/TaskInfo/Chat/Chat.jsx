import Message from "./Message";
import MessageInput from "./MessageInput";

import s from './ChatStyles/ChatStyle.module.css'

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import EmptyChat from "./EmptyChat";
import ContextMenuModeNotification from "./ContextMenuModeNotification";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../../../../_store/slices/chatSlice";


const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
const socket = io(domain)



const Chat = (props) => {
    
    const dispatch = useDispatch();
    const chatArray = useSelector(state => state.chat.chat)

    useEffect(() => {
        const { id } = JSON.parse(window.localStorage.getItem('task_info'))
        socket.emit('connected', id);
    })

    useEffect(() => {
        socket.on('recieve_messege', (chat_array) => {
            dispatch(setChat(chat_array))
        })
    }, [chatArray, socket])

    const message = chatArray.map((element, index) => (
        <div key={index}>
            <Message message={element} previous_message={index > 0 ? chatArray[index - 1] : null}
                socket={socket}/>
        </div>
    ));

    return (
        <div className={s.wrapper}>
            <ContextMenuModeNotification />
            {chatArray.length > 0 ? message : <EmptyChat socket={socket}/>}
            <MessageInput socket={socket} />
        </div>
    )
}

export default Chat