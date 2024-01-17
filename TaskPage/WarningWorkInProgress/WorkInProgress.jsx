import s from './WorkInProgress.module.css'

import error_icon from './Icons/error.svg'

import { useState } from 'react'

const WorkInProgress = (props) => {

    const show_block = window.sessionStorage.getItem('show_block')
    const warningDelete = props.warningDelete

    const [showWarningBlock, setShowWarningBlock] = useState(true) //show_block

    if (showWarningBlock === null) {
        setShowWarningBlock(true)
    }

    const closeWarningBlock = () => {
        window.sessionStorage.setItem('show_block', false)

        if (showWarningBlock) {
            setShowWarningBlock(false)
        }


    }

    return (
        <div className={s.warning_wrapper} style={{ display: showWarningBlock === true ? 'flex' : 'none' }}>
            <div className={s.warning_item}>
                <div className={`${s.warning_header} ${s.warning_red}`}>
                    <img src={error_icon} alt="" />
                </div>
                <div className={s.warning_content}>
                    <h3 className='button_text'>Warning!</h3>
                    <h4 className={`${s.task_font} task_font`}>{props.warning_text}</h4>

                    <div className={`${s.button_wrapper}`} style={{ justifyContent: warningDelete ? 'space-between' : 'center' }}>
                        <p className={`${s.warning_button_cancel} ${s.warning_button_close}`}
                            onClick={closeWarningBlock}
                            style={{ display: warningDelete ? 'block' : 'none' }}>Close</p>
                        <p className={`${s.warning_button_close} ${s.warning_red}`}
                            onClick={closeWarningBlock}>{warningDelete ? 'Delete' : 'Close'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkInProgress