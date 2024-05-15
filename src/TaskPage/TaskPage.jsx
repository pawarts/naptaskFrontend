import LoadedPage from "./LoadedPage"
import Loading from "./Components/Loading/Loading"
import Notification from "./Components/Notification/Notification"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setNotificationArray } from "../_store/slices/notificationSlice"

import { io } from "socket.io-client"
import SomthingWentWrong from "../BaseComponents/WarningWindows/SomthingWentWrong/SomethingWentWrong"


const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
console.log(domain)
const socket = io(domain)


const TaskPage = (props) => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    const loading = (status) => {
        setLoaded(status)
    }

    useEffect(() => {
        const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
        const id = localStorage.getItem('user_id');

        socket.emit('get_notification', id);
        socket.on('get', (notificationArray) => {
            dispatch(setNotificationArray(notificationArray))
        })

    }, [socket])

    /*if (!window.localStorage.getItem('user_id')) {
        window.location.pathname = '/login'
    }*/

    return (
        <div>
            <LoadedPage loading={loading} />

            <Loading loaded={loaded} />
            <SomthingWentWrong />

            <Notification socket={socket} />
        </div>
    )
}

export default TaskPage
