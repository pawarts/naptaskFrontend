import s from './ChatStyles/ContextMenuModeNotification.module.css'
import closeIcon from '../../Notification/NotificationIcon/close.svg'

import { setEditMessageMode, setMessageInput } from '../../../../_store/slices/chatSlice'
import { useDispatch, useSelector } from 'react-redux'

const ContextMenuModeNotification = (props) => {

    const dispatch = useDispatch()
    const view = useSelector(state => state.chat.editMessageMode)

    const endEditMode = () => {
        dispatch(setEditMessageMode(false))
        dispatch(setMessageInput(''))
    }

    return (
        <div className={s.wrapper}
            style={{display: view ? 'flex' : 'none'}}>
            <h4 className={s.mode_title}>Редагування повідомлення</h4>
            <button onClick={endEditMode}>
                <img src={closeIcon} alt="" />
            </button>
        </div>
    )

}

export default ContextMenuModeNotification


