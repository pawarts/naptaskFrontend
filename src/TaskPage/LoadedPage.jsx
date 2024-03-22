import Navigation from "../BaseComponents/Navigation/Navigation"
import Table from "./Components/Task/Table"
import TaskHeader from "./Components/TaskHeader/TaskHeader"
import Perfomance from "./Components/PerfomanceMonitor/Perfomance"
import WorkInProgress from "./WarningWorkInProgress/WorkInProgress"

import { Link } from "react-router-dom"
import { useState } from "react"

import s from './Task.module.css'
import add_task_button from './TaskIcons/AddTaskButton.svg'
import { useSelector } from "react-redux"

const LoadedPage = (props) => {

    const loaded = props.loaded

    return (
        <div className={s.wrapper} >
            <WorkInProgress />
            <Perfomance />
            <div className={s.schedule_wrapper} >
                <TaskHeader />
                <Table loaded={loaded} />
            </div>
            <Navigation />

            <Link to='/create_task' className={s.add_task_button}>
                <img src={add_task_button} alt="" />
            </Link>
        </div >
    )
}

export default LoadedPage