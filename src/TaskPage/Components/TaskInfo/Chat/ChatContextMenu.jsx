import { useDispatch, useSelector } from 'react-redux'
import s from './ChatStyles/ChatContextMenu.module.css'
import { setEditMessageMode, setMessageBody, setMessageInput } from '../../../../_store/slices/chatSlice'

const ChatContextMenu = (props) => {

    const dispatch = useDispatch();
    const message_input = useSelector(state => state.chat.messageInput)
    const messageBody = useSelector(state => state.chat.messageBody)

    const { message, socket, viewContextMenu } = props
    const message_value = message.message

    const viewStyleActive = {
        transform: 'translateX(0)',
        opacity: 1
    }

    const viewStyle = {
        transform: 'translateX(10px)',
        opacity: 0
    }

    const { id } = JSON.parse(localStorage.getItem('task_info'))
    const deleteMessage = () => {
        socket.emit('delete_message', { id, message })
    }
    const editMessage = () => {
        dispatch(setMessageInput(message_value))
        dispatch(setMessageBody(message))
        dispatch(setEditMessageMode(true))
    }

    return (
        <div className={s.wrapper}
            style={viewContextMenu && props.check_author ? viewStyleActive : viewStyle}>
            <p className={s.context_menu_button} onClick={deleteMessage}>Видалити</p>
            <p className={s.context_menu_button} onClick={editMessage}>Редагувати</p>
        </div>
    )

}

export default ChatContextMenu