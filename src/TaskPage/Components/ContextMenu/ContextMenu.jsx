import s from './ContextMenu.module.css'
import ContextMenuButton from './ContextMenuButtons'

import editButton from './ContextIcon/Edit.svg'
import deleteIcon from './ContextIcon/Delete.svg'

const ContextMenu = (props) => {



    const hide = props.hide;
    const id = props.id;

    const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'

    const deleteTask = () => {

        const {collaborators} = JSON.parse(window.localStorage.getItem('task_info'));

        const collaboratorsLength = collaborators.length

        if(collaboratorsLength === 0 || collaboratorsLength === 1){ 

            const url = `${domain}/task/delete/${id}`

            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // Вказати тип відправленого контенту
                },
                body: JSON.stringify({ user_id: window.localStorage.getItem('user_id') })
            })
                .then(response => response.text(''))
                .catch(error => console.log(error))
        } else {
            const url = `${domain}/task/delete_user/${id}`
            const user = window.localStorage.getItem('login');
            const user_id = window.localStorage.getItem('user_id')

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({login: user, user_id: user_id})
            })
                .then(response => response.text(''))
                .catch(error => console.error(error))

        }
    }


    return (
        <div className={`context_wrapper ${s.context_wrapper}`}
            style={{
                transform: hide ? 'scale(1)' : 'scale(0)'
            }}>
            <ContextMenuButton icon_link={editButton}
                context_text='Edit' action={props.openEditMenu} link='' />
            <ContextMenuButton icon_link={deleteIcon}
                context_text='Delete' action={deleteTask} link='/task' /> {/*/task*/}
        </div>
    )
}

export default ContextMenu