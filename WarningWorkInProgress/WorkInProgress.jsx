import s from './WorkInProgress.module.css'

import error_icon from './Icons/error.svg'

import { useState } from 'react'

const WorkInProgress = (props) => {

    const show_block = window.sessionStorage.getItem('show_block')

    const [showWarningBlock, setShowWarningBlock] = useState(show_block)

    if (showWarningBlock === null) {
        setShowWarningBlock(true)
    }

    const closeWarningBlock = () => {
        window.sessionStorage.setItem('show_block', false)

        if (showWarningBlock) {
            setShowWarningBlock(false)
        }

        console.log(showWarningBlock)
    }

    return (
        <div className={s.warning_wrapper} style={{ display: showWarningBlock === true ? 'flex' : 'none' }}>
            <div className={s.warning_item}>
                <div className={`${s.warning_header} ${s.warning_red}`}>
                    <img src={error_icon} alt="" />
                </div>
                <div className={s.warning_content}>
                    <h3 className='button_text'>Warning!</h3>
                    <h4 className={`${s.task_font} task_font`}>Work in progress. Application can work unstable.</h4>

                    <p className={`${s.warning_button_close} ${s.warning_red}`}
                        onClick={closeWarningBlock}>Close</p>
                </div>
            </div>
        </div>
    )
}

export default WorkInProgress