import { useState, useEffect } from 'react';
import s from './Warning.module.css'

const WarningWindow = (props) => {



    const [view, setView] = useState(props.view_warning);
    const warning_text = props.warning_text;

    console.log(view)

    useEffect(() => {
        setView(props.view_warning);
    }, [props.view_warning]);

    return (
        <div className={s.warning_wrapper} style={{ top: view ? '0px' : '-100%' }}>
            <p className={`button_text ${s.warning_text}`}>{warning_text}</p>
        </div>
    )
}

export default WarningWindow