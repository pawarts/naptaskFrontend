import TaskTitle from './TaskTitle'
import EditTask from './EditTask'
import ContextMenu from '../ContextMenu/ContextMenu'
import SubmitButton from '../../../BaseComponents/Buttons/SubmitButton'

import Chat from './Chat/Chat'


import s from './TaskInfoStyle/TaskInfo.module.css'

import { useState } from 'react'
import { useSelector } from "react-redux"

import TaskInfoArticles from './TaskInfoArticles'
import TaskInfoModeButton from './TaskInfoModeButton'
import Collaborators from './Collaborators/CollaboratorsPage'

const TaskInfo = (props) => {
    const busyViewer = useSelector(state => state.view.busyTimeView)
    const active_mode = useSelector(state => state.view.taskInfoMode)
    const editMessageMode = useSelector(state => state.chat.editMessageMode)

    const [contextMenu, setContextMenu] = useState(false);
    const [editMenu, setEditMenu] = useState(false);

    const openContextMenu = () => {
        const copyContextMenu = !contextMenu;
        setContextMenu(copyContextMenu)
    }

    const closeContextMenu = (event) => {
        const eventTargetClassContainsChecker = event.target.parentNode.classList.contains('context_item');

        if (!eventTargetClassContainsChecker && contextMenu) {
            setContextMenu(false)
        }
    }

    const openEditMenu = (event) => {
        event.preventDefault()
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
        const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
        const URL = `${domain}/task/edit/${id}`

        fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataSet)
        })
            .then(response => response.text())
            .then(() => {
                window.location.pathname = '/task'
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={s.wrapper} onClick={event => closeContextMenu(event)}
            style={{
                maxHeight: busyViewer ? '100vh' : 'none',
                overflowY: busyViewer ? 'hidden' : 'overflow'
            }}>

            <TaskTitle task_info={task_info} openContextMenu={openContextMenu} editMenu={editMenu} />

            <ContextMenu hide={contextMenu} id={task_info.id} openEditMenu={openEditMenu} />

            <EditTask hide={editMenu} id={task_info.id} />

            <div className={s.task_mode_wrapper} style={{
                display: task_info.collaborators.length > 1 && !editMenu && !editMessageMode? 'flex' : 'none'
            }}>
                <TaskInfoModeButton button_text='Task info' />
                <TaskInfoModeButton button_text='Chat' />
            </div>
            <div style={{
                display: active_mode === 'Task info' ? 'block' : 'none'
            }}>
                <div className={s.task_details_wrapper}>
                    <TaskInfoArticles type="details" editMenu={editMenu} />
                    <TaskInfoArticles type="subtask" editMenu={editMenu} />
                    <Collaborators editMenu={editMenu} />
                </div>

                <div className={s.done_wrapper} style={{
                    display: !editMenu ? 'inline-block' : 'none'
                }}>

                    <SubmitButton button_text='Mark as done' click={doneTaskAction} />
                </div>
            </div>
            <div style={{
                display: active_mode === 'Chat' ? 'block' : 'none'
            }}>
                <Chat />
            </div>

        </div>
    )
}

export default TaskInfo