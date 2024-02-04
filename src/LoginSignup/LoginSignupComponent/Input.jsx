import React, { useState } from "react";

import s from "./ComponentStyles/Input.module.css"


const Input = (props) => {

    const [isNotEmpty, setIsNotEmpty] = useState(false)

    const input_name = props.input_name;

    function inputValueLengthChecker(event) {
        console.log(event.target.value.length)
        if (event.target.value.length > 0) {
            setIsNotEmpty(true)
        } else { setIsNotEmpty(false) }
    }

    return (
        <div className={s.input_wrapper}>
            <input id={`${input_name}`} className={`${s.enter_input} ${isNotEmpty ? s.active_input : ''}`}
                onInput={event => inputValueLengthChecker(event)}
                type="text" name={`${input_name}`} />
            <label htmlFor={`${input_name}`}
                className={`${s.input_title}
                 ${isNotEmpty ? s.active_label_input : s.label_input}`}>
                {input_name}
            </label>

        </div>
    )
}

export default Input