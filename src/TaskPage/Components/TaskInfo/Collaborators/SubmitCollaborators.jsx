import { useDispatch, useSelector } from "react-redux"
import { setAddCollaborator } from "../../../../_store/slices/viewSlice"
import s from './CollaboratorsStyle/FindUser.module.css'
import FoundUser from "./FoundUser"

const SumbitCollaborators = (props) => {
    const dispatch = useDispatch()
    const selectedUser = useSelector(state => state.foundUser.selectedUser)

    const sendNewCollaborators = () => {

        const { id } = JSON.parse(window.localStorage.getItem("task_info"))

        const dataSet = { login: selectedUser.map(user => user.login), task_id: id };

        const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
        fetch(`${domain}/updateCollaborators`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Вказати тип відправленого контенту
            },
            body: JSON.stringify(dataSet)
        })
            .then(response => response.json())
            .then(result => {
                dispatch(setAddCollaborator(false))
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    const user = selectedUser.map((element, index) => (
        <div key={index}>
            <FoundUser user_info={element} />
        </div>
    ))

    return (
        <div className={s.wrapper}>
            <div className={s.user_list_wrapper}>
                {user}
            </div>
            <div className={s.button_wrapper}>
                <button onClick={props.next_page}>Cancel</button>
                <button className={s.submit_button} onClick={sendNewCollaborators}>Submit</button>
            </div>
        </div>
    )
}

export default SumbitCollaborators