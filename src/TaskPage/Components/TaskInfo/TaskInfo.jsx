import TaskTitle from './TaskTitle'
import EditTask from './EditTask'
import ContextMenu from '../ContextMenu/ContextMenu'


import s from './TaskInfoStyle/TaskInfo.module.css'

import { useState } from 'react'
import SubmitButton from '../../../BaseComponents/Buttons/SubmitButton'

const TaskInfo = (props) => {


    const [contextMenu, setContextMenu] = useState(false);
    const [editMenu, setEditMenu] = useState(false);

    const closeContextMenu = (event) => {
        const eventTargetClassContainsChecker = event.target.parentNode.classList.contains('context_item');

        if (!eventTargetClassContainsChecker && contextMenu) {
            setContextMenu(false)
        }
    }

    const openContextMenu = () => {
        const copyContextMenu = !contextMenu;
        setContextMenu(copyContextMenu)
    }

    const openEditMenu = () => {
        const copyEditState = !editMenu;

        setEditMenu(copyEditState)
    }
    let task_info = JSON.parse(window.localStorage.getItem("task_info"))


    const doneTaskAction = () => {

        const dataSet = {
            done: true,
            user_id: localStorage.getItem('user_id')
        }

        const id = task_info.id;
        const URL = `https://naptask-back.onrender.com/task/delete/${id}`

        fetch(URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataSet)
        })
            .then(response => response.text())
            .then(() => {
                const date = new Date();

                const getMonth = date.getMonth();
                const getDate = date.getDate();
                const getYear = date.getFullYear();

                const todayDate = `${getMonth}/${getDate}/${getYear}`

                const howManyTasksDone = JSON.parse(window.localStorage.getItem("howManyTaskDoneToday"));

                window.localStorage.setItem("howManyTaskDoneToday", JSON.stringify({
                    date: todayDate,
                    done: howManyTasksDone.done + 1
                }))

                window.location.pathname = '/task'
            })
            .catch(error => console.log(error))
    }


    return (
        <div className={s.wrapper} onClick={event => closeContextMenu(event)}>
            <TaskTitle task_info={task_info} openContextMenu={openContextMenu} />

            <ContextMenu hide={contextMenu} id={task_info.id} openEditMenu={openEditMenu} />

            <EditTask hide={editMenu} id={task_info.id} />

            <div className={s.button_wrapper} style={{
                display: editMenu ? 'none' : 'block'
            }}>
                <SubmitButton button_text='Mark as done' click={doneTaskAction} />
            </div>
        </div>
    )
}
export default TaskInfo