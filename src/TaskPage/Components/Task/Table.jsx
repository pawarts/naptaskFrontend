import TimeTable from "./TimeTable"
import Task from './Task'

import s from '../ComponentStyle/Table.module.css'

import { useState, useEffect } from "react"


const Table = (props) => {

    const changeHowManyTask = props.changeHowManyTask

    const [data, setData] = useState([]);
    const [taskNumberValue, setTaskNumberValue] = useState({})
    const [rerender, setRerender] = useState(true);
    const [loaded, setLoaded] = useState(false);

    const currentTime = new Date();
    let currentMonth = currentTime.getMonth() + 1;
    let currentDay = currentTime.getDate();
    const currentYear = currentTime.getFullYear();

    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth;
    }
    if (currentDay < 10) {
        currentDay = '0' + currentDay;
    }

    window.localStorage.setItem("over_task_array", [])

    useEffect(() => {
        // Ваш код

        fetch(`https://naptask-back.onrender.com/task?id=${localStorage.getItem('user_id')}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {

                setLoaded(true)
                const howManyTaskToday = result.tasks.filter(item => item.date === `${currentYear}-${currentMonth}-${currentDay}`).length;
                const nowTaskNumber = window.localStorage.getItem('howManyTaskToday');

                if (howManyTaskToday >= nowTaskNumber) {
                    window.localStorage.setItem('howManyTaskToday', howManyTaskToday);
                    changeHowManyTask(howManyTaskToday)
                } else {
                    changeHowManyTask(Number(nowTaskNumber) + 1)
                }


                setData(result.tasks);

            })
            .catch(error => console.error('Error fetching data:', error));

    }, [rerender]);

    data.sort((a, b) => {
        const dateA = a.date;
        const dateB = b.date;

        if (dateA < dateB) {
            return -1
        } else if (dateA > dateB) {
            return 1
        } else {
            const timeA = `${a.startTime}`;
            const timeB = `${b.startTime}`;

            if (timeA < timeB) {
                return -1
            } else if (timeA > timeB) {
                return 1
            } else {
                return 0
            }
        }
    })

    const task = loaded ? data.map((element, index, array) => (
        <Task key={index} title={element.title}
            timeStart={element.startTime} timeEnd={element.endTime}
            date={element.date} currentDate={props.date} color={element.color}
            id={element._id} prev_time={{
                overTaskId: index < data.length - 1 && element.date === array[index + 1].date ? array[index + 1]._id : "",
                timeStart: index < data.length - 1 && element.date === array[index + 1].date ? array[index + 1].startTime : "",
                prev_index: index + 1
            }} rerender={rerender} setRerender={setRerender}
            changeNowManyTaskDone={props.changeNowManyTaskDone} />
    )) : (<p>Loading</p>)


    const scrollToHourNow = (element) => {
        const date = currentTime;
        const hourNow = date.getHours();
        const time_margin = 239;

        element.scrollTo({ top: hourNow * time_margin })
    }



    return (
        <div className={s.wrapper} onLoad={(event) => scrollToHourNow(event.currentTarget)}>
            <TimeTable time={currentTime} />
            {task}
        </div>
    )
}

export default Table