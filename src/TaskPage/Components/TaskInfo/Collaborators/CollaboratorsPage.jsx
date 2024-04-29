import CollaboratorItem from './CollaboratorItem';

import AddMemberIcon from './CollaboratorIcon/AddNewCollaborator.svg'

import s from './CollaboratorsStyle/CollaboratorsStyle.module.css'
import { useState } from 'react';
import AddColaborartorForm from './AddColaborator';
import { useDispatch } from 'react-redux';
import { setAddCollaborator } from '../../../../_store/slices/viewSlice';

const Collaborators = (props) => {

    const dispatch = useDispatch()

    const collaborators = JSON.parse(window.localStorage.getItem("task_info")).collaborators
    const [addMember, setAddMember] = useState(false)

    const addNewCollaboratorPage = () => { dispatch(setAddCollaborator(true)) }

    const collaborator = collaborators.map((element, index) => (
        <div key={index}>
            <CollaboratorItem element={element} />
        </div>
    ));
    return (
        <div className={s.wrapper} style={{
            display: !props.editMenu ? 'block' : 'none'
        }}>
            <h4 className={`settings_title ${s.title}`}>Members</h4>
            <div className={s.collaborators_item}>
                {collaborator}
                <CollaboratorItem user_icon={AddMemberIcon} action={addNewCollaboratorPage} />
            </div>

            <AddColaborartorForm />
        </div>
    )
}

export default Collaborators