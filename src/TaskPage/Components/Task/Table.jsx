import TimeTable from "./TimeTable"
import Task from './Task'

import s from '../ComponentStyle/Table.module.css'

import { useState, useEffect } from "react"


const Table = (props) => {

    const changeHowManyTask = props.changeHowManyTask

    const [data, setData] = useState([]);
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
                setData(result.tasks);

                const howManyTaskToday = result.tasks.filter(item => item.date === `${currentYear}-${currentMonth}-${currentDay}`).length;
                const howManyTaskTodayDone = result.tasks.filter(item => item.date === `${currentYear}-${currentMonth}-${currentDay}` && item.missed).length;

                changeHowManyTask({
                    howManyTask: howManyTaskToday,
                    howManyTaskDone: howManyTaskTodayDone
                })

                window.localStorage.setItem('howManyTaskToday', howManyTaskToday)
                window.localStorage.setItem('howManyTaskDoneToday', howManyTaskTodayDone)
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
            }} rerender={rerender} setRerender={setRerender} />
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