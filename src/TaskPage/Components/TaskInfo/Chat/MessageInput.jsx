import { useState } from 'react'
import send_icon from './ChatIcons/send.svg'

import s from './ChatStyles/MessageInput.module.css'

const MessageInput = (props) => {

    const [textareaValue, setTextareaValue] = useState('')
    const [sendButtonStatus, setSendButtonStatus] = useState(false)

    const { socket } = props

    const send_message = () => {

        const { id } = JSON.parse(window.localStorage.getItem('task_info'))

        const data_to_send = {
            task_id: id,
            from: window.localStorage.getItem('login'),
            message: textareaValue,
            timestamp: new Date()
        }


        socket.emit('send_message', data_to_send)

        setTextareaValue('')
        setSendButtonStatus(false)
    }

    const changeHeight = (event) => {
        const element = event.currentTarget;

        const string_length = element.value.length

        setTextareaValue(element.value)

        setSendButtonStatus(true)

        if (string_length % 45 === 0 && string_length > 45 && string_length < 135) {
            element.style.height = element.scrollHeight + 'px'
        } else if (string_length === 0) {
            element.style.height = 'auto'
            setSendButtonStatus(false)
        }
    }
    return (
        <div className={s.wrapper}>
            <textarea className={`${s.message_input}`}
                name="" id="" onInput={(event) => { changeHeight(event) }}
                placeholder='Write your message' value={textareaValue}></textarea>


            <button className={s.send_button} style={{
                opacity: sendButtonStatus ? 1 : 0,
                right: sendButtonStatus ? '3px' : '30px'
            }}
                onClick={send_message}>
                <img src={send_icon} alt="" />
            </button>
        </div>
    )
}

export default MessageInput