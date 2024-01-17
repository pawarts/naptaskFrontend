import { useState } from 'react'
import s from './CreateTaskStyle.module.css'

const ChooseColor = (props) => {

    const checked = props.checked;
    const setChecked = props.setChecked;

    const [checker, setChecker] = useState(false);


    return (
        <input className={s.color_input} name='colors' type="radio" value={props.color} style={{
            background: props.color
        }} onChange={event => props.setColorValue(event, 'Color')} />
    )
}

export default ChooseColor