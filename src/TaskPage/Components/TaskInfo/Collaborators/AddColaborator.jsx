

import arrowBack from '../TaskInfoIcon/ArrowBack.svg'

import s from './CollaboratorsStyle/AddColaboratorStyle.module.css'

import { setAddCollaborator } from '../../../../_store/slices/viewSlice'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FindCollaborator from './FindCollaborator';
import SumbitCollaborators from './SubmitCollaborators';

const AddColaborartorForm = () => {

    const dispatch = useDispatch();
    const view = useSelector(state => state.view.addCollobarator)

    const selectedUser = useSelector(state => state.foundUser.selectedUser)

    const [submitCollaborator, setSubmitCollaborator] = useState(false)

    const closeWindow = () => {
        dispatch(setAddCollaborator(false))
    }

    const openSubmitCollaboratorWindow = () => {
        if (selectedUser.length > 0) {
            setSubmitCollaborator(!submitCollaborator)
        }
    }


    const sendNewCollaborators = () => { }


    return (
        <div className={s.wrapper} style={{ display: view ? 'flex' : 'none' }}>


            <header className={s.header}>
                <button onClick={closeWindow}>
                    <img src={arrowBack} alt="" />
                </button>
            </header>

            <div style={{ display: !submitCollaborator ? 'block' : 'none' }}>
                <FindCollaborator next_page={openSubmitCollaboratorWindow} />
            </div>
            <div style={{ display: submitCollaborator ? 'block' : 'none' }}>
                <SumbitCollaborators next_page={openSubmitCollaboratorWindow} />
            </div>
        </div>
    )
}

export default AddColaborartorForm