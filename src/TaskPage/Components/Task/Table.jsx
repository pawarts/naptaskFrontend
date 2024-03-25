import TimeTable from "./TimeTable"
import Task from './Task'

import s from '../ComponentStyle/Table.module.css'

import { getWeek } from 'date-fns';

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addTask } from "../../../_store/slices/taskSlice"
import { setSchedule, setScheduleBody, setFiltredSchedule } from "../../../_store/slices/scheduleSlice"


const Table = (props) => {

    const dispatch = useDispatch()
    const loaded = props.loaded
    const currentDate = useSelector(state => state.date.date);
    const tasks = useSelector(state => state.tasks.tasks)
    const schedules = useSelector(state => state.schedules.schedules)
    const filteredSchedules = useSelector(state => state.schedules.filteredSchedules)

    //schedules[dayKey[day]]
    const day = useSelector(state => state.date.day)

    const dayKey = useSelector(state => state.date.dayShortForm);

    const [rerender, setRerender] = useState(useSelector(state => state.schedules.checkNewSchedule));

    const a = useSelector(state => state.date.date);
    const currentTime = new Date(a);
    let currentMonth = currentTime.getMonth() + 1;
    let currentDay = currentTime.getDate();
    const currentYear = currentTime.getFullYear();

    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth;
    }
    if (currentDay < 10) {
        currentDay = '0' + currentDay;
    }


    const date = `${currentYear}-${currentMonth}-${currentDay}`;

    const setDataToState = (value) => dispatch(addTask({ tasks: value, date: date }))




    window.localStorage.setItem("over_task_array", [])
    useEffect(() => {
        // Ваш код
        const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
        fetch(`${domain}/task?id=${localStorage.getItem('user_id')}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {

                setDataToState(result.tasks)


                loaded(true)
            })
            .catch(error => console.error('Error fetching data:', error));

        const scheduleDomain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
        fetch(`${scheduleDomain}/schedule?id=${localStorage.getItem('user_id')}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                dispatch(setSchedule(result.schedules))
                dispatch(setScheduleBody(filteredSchedules))
                dispatch(setFiltredSchedule({
                    getWeek: getWeek(currentDate),
                    schedules: result.schedules
                }))
            })
            .catch(error => console.error(error))

    }, [rerender, currentDate]);


    const scheduleTasks = useSelector(state => state.schedules.scheduleBody)

    //console.log(scheduleTasks[dayKey[day]])


    const prevTimeChecker = (index, element, array, data) => {
        return index < data.length - 1 && element.date === array[index + 1].date && !array[index + 1].done
    }
    const task = tasks.map((element, index, array) => (
        <Task key={index} task_element={element} prev_time={{
            overTaskId: prevTimeChecker(index, element, array, tasks) ? array[index + 1]._id : "",
            timeStart: prevTimeChecker(index, element, array, tasks) ? array[index + 1].startTime : "",
            prev_index: index + 1
        }} rerender={rerender} setRerender={setRerender} done={element.done} />
    ))

    const freeTime = (element) => {
        const requestStart = '20:10'
        const requestEnd = '20:15'
        const timeStart = element.timeStart
        const timeEnd = element.timeEnd

        return (requestStart >= timeStart || requestEnd > timeStart) && (requestStart <= timeEnd || timeEnd >= requestEnd)
    }

    if (scheduleTasks[dayKey[day]]) {
        const sort = scheduleTasks[dayKey[day]].filter(element => freeTime(element))
    }

    const schedule = scheduleTasks[dayKey[day]] ? scheduleTasks[dayKey[day]].map((element, index) => (
        <Task key={index} task_element={element} scheduleTask={true} prev_time={{
            timeStart: ''
        }} />
    )) : ''


    const scrollToHourNow = (element) => {
        setRerender(!rerender)
        dispatch(setScheduleBody(filteredSchedules))

        const dates = currentTime;
        const hourNow = dates.getHours();
        const time_margin = 239;

        const scheduleBodyChecker = () => {
            if (typeof scheduleTasks[dayKey[day]] !== 'undefined') {
                //console.log(filteredSchedules)
                return scheduleTasks[dayKey[day]].length > 0
            } else {
                return false
            }
        }

        const scheduleTimeStart = scheduleBodyChecker() ? Number(scheduleTasks[dayKey[day]][0].timeStart.split(':')[0]) : -9;
        const todayTask = tasks.filter(element => {
            return element.date === date
        })
        const taskTimeStart = todayTask.length > 0 ? Number(todayTask[0].startTime.split(':')[0]) : -10

        const timeStart = (scheduleTimeStart > taskTimeStart) && (taskTimeStart !== -10 && scheduleTimeStart !== -9) ? taskTimeStart : scheduleTimeStart;


        if (dates.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]) {
            element.scrollTo({ top: hourNow * time_margin })
        } else {
            element.scrollTo({ top: timeStart * time_margin })
        }
    }

    return (
        <div className={s.wrapper} onLoad={(event) => scrollToHourNow(event.currentTarget)}>
            <TimeTable time={currentTime} />
            {task}
            {schedule}
        </div>
    )
}

export default Table