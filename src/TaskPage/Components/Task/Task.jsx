import s from '../ComponentStyle/Task.module.css'

import time_icon from './TaskIcon/TimeIcon.svg'
import more_icon from './TaskIcon/MoreIcon.svg'
import { useState } from 'react'


//1 hour height qual to 52px

const Task = (props) => {


    const time = new Date();
    //time.setHours(8)

    const hourNow = time.getHours();
    const minuteNow = time.getMinutes();

    const date = props.date;

    const currentDate = props.currentDate;
    let current_day = currentDate.getDate();
    let current_month = currentDate.getMonth() + 1;
    const current_year = currentDate.getFullYear();

    const prev_time = props.prev_time;

    const prevTimeStart = prev_time.timeStart;
    //const prevTimeEnd = prev_time.timeEnd;

    const timeStart = props.timeStart;
    const timeEnd = props.timeEnd;
    const title = props.title;
    const color = props.color;

    let hourStart = Number(timeStart.split(':')[0]);
    let minuteStart = Number(timeStart.split(':')[1].slice(0, 2));
    let hourEnd = Number(timeEnd.split(':')[0]);
    let minuteEnd = Number(timeEnd.split(':')[1].slice(0, 2));

    if (minuteStart < 10) {
        minuteStart = '0' + minuteStart;
    }
    if (hourStart < 10) {
        hourStart = '0' + hourStart;
    }

    if (minuteEnd < 10) {
        minuteEnd = '0' + minuteEnd;
    }
    if (hourEnd < 10) {
        hourEnd = '0' + hourEnd;
    }


    let top = 0;
    let left = 60;
    let height = 0;
    let width = 250;

    const overTaskCondition = `${hourStart}:${minuteStart}` < prevTimeStart && prevTimeStart < `${hourEnd}:${minuteEnd}` && prevTimeStart !== '';

    const overTaskArray = window.localStorage.getItem("over_task_array").split(',')

    if (overTaskCondition || overTaskArray.includes(props.id)) {
        width = width / 2

        if (overTaskArray.includes(props.id)) {
            left = 145 + 70
        }
        overTaskArray.push(prev_time.overTaskId)
        window.localStorage.setItem('over_task_array', overTaskArray)
    } else {
        width = 250
        left = 60
        window.localStorage.setItem('over_task_array', overTaskArray.filter(item => item !== props.id))
    }


    let hide = false

    const time_margin = 239;
    const minute_per_pixel = time_margin / 60;

    const heightCalc = () => {
        const startTime = new Date(`2023-01-01 ${timeStart}`);
        const endTime = new Date(`2023-01-01 ${timeEnd}`);

        const timeDifference = endTime - startTime;

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));


        height = (60 * hours + minutes) * minute_per_pixel;

        return height
    }

    if (current_month < 10) {
        current_month = '0' + current_month;
    }
    if (current_day < 10) {
        current_day = '0' + current_day;
    }

    const date_checker = date === `${current_year}-${current_month}-${current_day}`;

    if (date_checker) {
        hide = false;
        if (!hide) {
            top = hourStart * time_margin;
            if (minuteStart > 0) {
                top = top + minute_per_pixel * minuteStart;
            }
            height = heightCalc()
        }
    } else {
        hide = true
    }
    const [clickCounter, setClickCounter] = useState(true);
    const viewTask = (event) => {

        let clicked = true;

        const context_wrapper = event.target.classList.contains("ContextMenu_context_item__wLW9R");
        const button_more = event.target.classList.contains("task_more");

        if ((event.currentTarget.clientHeight < 51 && clickCounter) && !context_wrapper && !button_more) {
            event.currentTarget.style.height = `100px`;
            clicked = false;

        } else {
            event.currentTarget.style.height = !short_task ? `${height}px` : '50px';
        }

        setClickCounter(clicked);
    }

    const openContextMenu = () => {

        const task_info = {
            id: props.id,
            title: title,
            startTime: timeStart,
            endTime: timeEnd,
            color: color,
            date: date
        }

        window.localStorage.setItem("task_info", JSON.stringify(task_info))


        window.location.pathname = '/task_info';
    }

    const short_task = height <= 50;
    const late_task = `${hourNow}:${minuteNow}` > `${timeEnd}:${minuteEnd}`;

    if (late_task) {
        const dataSet = {
            missed: true,
            user_id: localStorage.getItem('user_id')
        }


        const id = props.id;
        const domain = process.env.DOMAIN_NAME || 'http://localhost:10000'
        const URL = `${domain}/task/edit/${id}`

        fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Вказати тип відправленого контенту
            },
            body: JSON.stringify(dataSet)
        })
            .then(response => response.json())
            .catch(error => console.log(error))
    }


    return (
        <div className={s.task_wrapper} style={{
            top: `${top}px`,
            left: left,
            display: hide ? 'none' : 'flex',
            height: short_task ? '50px' : `${height}px`,
            width: width,
            zIndex: !clickCounter ? 2 : 1,
            backgroundColor: `${color}`,
        }} onClick={(event) => viewTask(event)}>
            <div className={s.task_info} >
                <h3 className={`${s.task_title} task_font`} style={{
                    textOverflow: !clickCounter ? 'none' : 'ellipsis',
                    whiteSpace: !clickCounter ? 'normal' : 'nowrap',
                    overflow: !clickCounter ? 'visible' : 'hidden',
                }}>{title}</h3>
                <div className={s.time_wrapper} style={{
                    opacity: height > 75 || (!clickCounter && height < 75) ? '1' : '0',
                }}>
                    <img src={time_icon} alt="" className={s.time_icon} />
                    <p className={`${s.time_text} task_font grey`} >{timeStart} - {timeEnd}</p>
                </div>
            </div>
            <div className={`${s.task_more}`} onClick={openContextMenu}>
                <img src={more_icon} alt="" className={`task_more ${s.task_more_icon}`} />
            </div>
        </div >
    )
}

export default Task