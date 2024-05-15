import Navigation from "../BaseComponents/Navigation/Navigation"
import Table from "./Components/Task/Table"
import TaskHeader from "./Components/TaskHeader/TaskHeader"
import Perfomance from "./Components/PerfomanceMonitor/Perfomance"
import WorkInProgress from "./WarningWorkInProgress/WorkInProgress"

import { Link } from "react-router-dom"

import s from './Task.module.css'
import add_task_button from './TaskIcons/AddTaskButton.svg'

import notificationIcon from './Components/Notification/NotificationIcon/Notifications.svg'

import { useDispatch } from "react-redux"
import { setNotification } from "../_store/slices/viewSlice"

const LoadedPage = (props) => {

    const { loading } = props

    const dispatch = useDispatch()

    const openNotificationWindow = () => { dispatch(setNotification(true)) }

    return (
        <div className={s.wrapper} >
            <WorkInProgress />
            <div className={s.header}>
                <Perfomance />

                <button onClick={openNotificationWindow}><img src={notificationIcon} alt="" /></button>
            </div>
            <div className={s.schedule_wrapper} >
                <TaskHeader />
                <Table loading={loading} />     
            </div>
            <Navigation />

            <Link to='/create_task' className={s.add_task_button}>
                <img src={add_task_button} alt="" />
            </Link>
        </div >
    )
}

export default LoadedPage