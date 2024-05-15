import { useDispatch, useSelector } from 'react-redux'
import NotificationItem from './NotificationItem'
import s from './NotificationStyle/Notification.module.css'
import { setNotification } from '../../../_store/slices/viewSlice'
import { setNotificationArray } from '../../../_store/slices/notificationSlice'
import { useEffect, useState } from 'react'

import close from './NotificationIcon/close.svg'
import EmptyNotification from './EmptyNotification'

const Notification = (props) => {

    const { socket } = props

    const dispatch = useDispatch();
    const view = useSelector(state => state.view.notificationWindow)

    const closeNotification = () => {
        dispatch(setNotification(false));
    }

    const notificationArray = useSelector(state => state.notification.notification);
    //console.log(notificationArray)

    useEffect(() => {
        const id = localStorage.getItem('user_id');

        socket.emit('get_notification', id);
    })

    useEffect(() => {
        const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'

        socket.on('get', (notificationArray) => {
            dispatch(setNotificationArray(notificationArray))
        })

    }, [socket])

    const notificationItem = notificationArray.map((element, index) => (
        <div key={index}>
            <NotificationItem element={element} />
        </div>
    ))


    return (
        <div className={s.wrapper} style={{ display: view ? 'block' : 'none' }}>

            <div className={s.close_btn}>
                <img src={close} alt="" onClick={closeNotification} />
            </div>

            {notificationArray.length > 0 ? (
                <div>
                    <h1 className='screen_title'>Події, що Ви могли пропустити</h1>
                    {notificationItem}
                </div>
            ) : (<EmptyNotification />)}

        </div>
    )
}

export default Notification