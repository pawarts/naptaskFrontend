
import s from './ChatStyles/EmptyChat.module.css'

import hello_image from './ChatIcons/hello_image.svg'

const EmptyChat = (props) => {

    const { socket } = props;

    const send_message = () => {

        const { id } = JSON.parse(window.localStorage.getItem('task_info'))

        const data_to_send = {
            task_id: id,
            from: window.localStorage.getItem('login'),
            message: 'Hi, evreyone!',
            timestamp: new Date()
        }


        socket.emit('send_message', data_to_send)
    }

    return(
        <div className={s.wrapper}>
            <h3 className='settings_title'>There are no messages yet</h3>
            <h4 className={`${s.task_font} task_font`}>Send a message or tap the greeting</h4>
            <button className={s.say_hi_button} onClick={send_message}>
                <img src={hello_image} alt="" />
            </button>
        </div>
    )
}

export default EmptyChat