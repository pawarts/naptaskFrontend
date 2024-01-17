import Navigation from "../BaseComponents/Navigation/Navigation"
import Table from "./Components/Task/Table"
import TaskHeader from "./Components/TaskHeader/TaskHeader"
import Perfomance from "./Components/PerfomanceMonitor/Perfomance"

import { Link } from "react-router-dom"

import add_task_button from './TaskIcons/AddTaskButton.svg'

import s from "./Task.module.css"
import { useState } from "react"
import WorkInProgress from "./WarningWorkInProgress/WorkInProgress"


const TaskPage = (props) => {

    const [date, setDate] = useState(new Date());
    const [howManyTask, setHowManyTask] = useState(0);
    const [howManyTaskDone, setHowManyTaskDone] = useState(0);

    const changeHowManyTask = (newNumber) => {
        console.log(newNumber)
        setHowManyTask(newNumber)
    }

    const changeNowManyTaskDone = (newNumber) => {
        setHowManyTaskDone(newNumber)
    }

    const change_date = (newDate) => {
        return setDate(newDate)
    }

    return (
        <div className={s.wrapper}>
            <WorkInProgress
                warning_text='Work in progress. Application can work unstable.'
                warningDelete={false}
            />
            <Perfomance howManyTask={howManyTask} />
            <div className={s.schedule_wrapper}>
                <TaskHeader change_date={change_date} />
                <Table date={date} changeHowManyTask={changeHowManyTask}
                    changeNowManyTaskDone={changeNowManyTaskDone} />
            </div>
            <Navigation />

            <Link to='/create_task' className={s.add_task_button}>
                <img src={add_task_button} alt="" />
            </Link>
        </div>
    )
}

export default TaskPage