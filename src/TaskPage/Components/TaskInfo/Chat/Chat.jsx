import Message from "./Message";
import MessageInput from "./MessageInput";

import s from './ChatStyles/ChatStyle.module.css'

import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io('localhost:10000')

const chat_array = [
    {
        from: 'Ellerman',
        message: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.'
    },
    {
        from: 'Test_User',
        message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
    }
]



const Chat = (props) => {

    const [chatArray, setChatArray] = useState([])

    useEffect(() => {
        const { id } = JSON.parse(window.localStorage.getItem('task_info'))
        socket.emit('connected', id);
    })

    useEffect(() => {
        socket.on('recieve_messege', (chat_array) => {
            setChatArray(chat_array)
        })
    }, [chatArray, socket])

    const message = chatArray.map((element, index) => (
        <div key={index}>
            <Message message={element} />
        </div>
    ));

    return (
        <div className={s.wrapper}>
            {message}
            <MessageInput socket={socket} />
        </div>
    )
}

export default Chat