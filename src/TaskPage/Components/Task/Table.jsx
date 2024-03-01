import TimeTable from "./TimeTable"
import Task from './Task'

import s from '../ComponentStyle/Table.module.css'

import { useState, useEffect } from "react"


const Table = (props) => {

    const changeHowManyTask = props.changeHowManyTask
    const loaded = props.loaded

    const [data, setData] = useState([]);
    const [rerender, setRerender] = useState(true);

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
        const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
        fetch(`${domain}/task?id=${localStorage.getItem('user_id')}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                setData(result.tasks);
                const howManyTaskToday = result.tasks.filter(item => item.date === `${currentYear}-${currentMonth}-${currentDay}`).length;
                const howManyTaskTodayDone = result.tasks.filter(item => item.date === `${currentYear}-${currentMonth}-${currentDay}` && item.done).length;

                changeHowManyTask({
                    howManyTask: howManyTaskToday,
                    howManyTaskDone: howManyTaskTodayDone
                })

                window.localStorage.setItem('howManyTaskToday', howManyTaskToday)
                window.localStorage.setItem('howManyTaskDoneToday', howManyTaskTodayDone)

                loaded(true)
            })
            .catch(error => console.error('Error fetching data:', error));

    }, [rerender]);

    data.sort((a, b) => {
        const timeA = `${a.startTime}`;
        const timeB = `${b.startTime}`;

        if (timeA < timeB) {
            return -1
        } else if (timeA > timeB) {
            return 1
        } else {
            return 0
        }
    })

    const prevTimeChecker = (index, element, array, data) => {
        return index < data.length - 1 && element.date === array[index + 1].date && !array[index + 1].done
    }
    const task = data.map((element, index, array) => (
        <Task key={index} task_element={element} currentDate={props.date} prev_time={{
            overTaskId: prevTimeChecker(index, element, array, data) ? array[index + 1]._id : "",
            timeStart: prevTimeChecker(index, element, array, data) ? array[index + 1].startTime : "",
            prev_index: index + 1
        }} rerender={rerender} setRerender={setRerender} done={element.done} />
    ))


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