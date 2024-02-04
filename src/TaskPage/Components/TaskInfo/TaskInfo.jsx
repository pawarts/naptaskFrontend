import TaskTitle from './TaskTitle'
import EditTask from './EditTask'
import ContextMenu from '../ContextMenu/ContextMenu'


import s from './TaskInfoStyle/TaskInfo.module.css'

import { useState } from 'react'

const TaskInfo = (props) => {


    const [contextMenu, setContextMenu] = useState(false);
    const [editMenu, setEditMenu] = useState(false);

    const openContextMenu = () => {
        const copyContextMenu = !contextMenu;
        setContextMenu(copyContextMenu)
    }

    const openEditMenu = () => {
        const copyEditState = !editMenu;

        setEditMenu(copyEditState)
    }
    let task_info = JSON.parse(window.localStorage.getItem("task_info"))

    return (
        <div className={s.wrapper}>
            <TaskTitle task_info={task_info} openContextMenu={openContextMenu} />

            <ContextMenu hide={contextMenu} id={task_info.id} openEditMenu={openEditMenu} />

            <EditTask hide={editMenu} id={task_info.id} />
        </div>
    )
}

export default TaskInfo