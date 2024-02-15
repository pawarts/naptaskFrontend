import s from '../ComponentStyle/Task.module.css'

import time_icon from './TaskIcon/TimeIcon.svg'
import more_icon from './TaskIcon/MoreIcon.svg'
import { useState } from 'react'


//1 hour height qual to 52px

const Task = (props) => {


    const transformDateNumberToString = (date_number) => {
        if (date_number < 10) {
            return '0' + date_number;
        }
        return date_number
    }

    const time = new Date();
    //time.setHours(8)

    const hourNow = time.getHours();
    const minuteNow = time.getMinutes();

    const currentDate = props.currentDate;
    let current_day = transformDateNumberToString(currentDate.getDate());
    let current_month = transformDateNumberToString(currentDate.getMonth() + 1);
    const current_year = currentDate.getFullYear();


    const prev_time = props.prev_time;

    const prevTimeStart = prev_time.timeStart;

    const task_element = props.task_element;
    const date = task_element.date;
    const timeStart = task_element.startTime;
    const timeEnd = task_element.endTime;
    const title = task_element.title;
    const color = task_element.color;


    let hourStart = transformDateNumberToString(Number(timeStart.split(':')[0]));
    let minuteStart = transformDateNumberToString(Number(timeStart.split(':')[1].slice(0, 2)));
    let hourEnd = transformDateNumberToString(Number(timeEnd.split(':')[0]));
    let minuteEnd = transformDateNumberToString(Number(timeEnd.split(':')[1].slice(0, 2)));

    let prevTimeStartDate = new Date(`2024-02-06T${prevTimeStart}:00`);
    let nowDate = new Date(`2024-02-06T${hourStart}:${minuteStart}:00`);
    const gapBetweenTask = (prevTimeStartDate - nowDate) / (1000 * 60)


    let top = 0;
    let left = 60;
    let height = 0;
    let width = 250;



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

    const date_checker = date === `${current_year}-${current_month}-${current_day}`;
    const done = props.done;
    if (date_checker && !done) {
        hide = false;
        if (!hide) {
            top = hourStart * time_margin;
            if (minuteStart > 0) {
                top = top + minute_per_pixel * minuteStart;
            }

            if (gapBetweenTask <= 2) {
                top -= 25
            } else if (gapBetweenTask <= 9) {
                top -= 15
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

        if ((event.currentTarget.clientHeight < 75 && clickCounter) && !context_wrapper && !button_more) {
            event.currentTarget.style.height = `75px`;
            clicked = false;

        } else if (gapBetweenTask < 15 && clickCounter) { clicked = false; }
        else {
            event.currentTarget.style.height = !short_task ? `${height}px` : '50px';
        }

        setClickCounter(clicked);
    }

    const openContextMenu = () => {

        const task_info = {
            id: task_element._id,
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
    const late_task = (`${hourNow}:${minuteNow}` > `${timeEnd}:${minuteEnd}`) && date_checker;

    if (late_task) {
        const dataSet = {
            missed: true,
            user_id: localStorage.getItem('user_id')
        }


        const id = task_element._id;
        const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
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
            backgroundColor: `#${color}`,
        }}

            onClick={(event) => viewTask(event)}>

            <div className={s.task_info} >
                <h3 className={`${s.task_title} task_font`} style={{
                    textOverflow: !clickCounter ? 'none' : 'ellipsis',
                    whiteSpace: !clickCounter ? 'normal' : 'nowrap',
                    overflow: !clickCounter ? 'visible' : 'hidden',
                }}>{title}</h3>
                <div className={s.time_wrapper} style={{
                    opacity: !clickCounter || height >= 75 ? '1' : '0',
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