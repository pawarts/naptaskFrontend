import React from 'react';

import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import s from './PerfomanceStyles/PerfomanceDiagram.module.css';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

const PerfomanceDiagram = (props) => {


    const howManyTask = props.howManyTask
    const allTaskNumber = howManyTask.howManyTask
    const doneTaskNumber = howManyTask.howManyTaskDone

    const done = doneTaskNumber / allTaskNumber;
    const undone = done > 0 ? 1 - done : 0;

    const data = {
        datasets: [{
            data: [done, undone],
            backgroundColor: ['rgb(28, 27, 31)', 'rgb(255,255,255)'],
            borderColor: [],
            borderWidth: 0,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        }
    };

    return (
        <div className={s.diagram_wrapper}>
            <div className={` ${s.diagram_item}`}>
                <Pie data={data} options={options}></Pie>
            </div>
            <p className='button_text'>{doneTaskNumber}/{allTaskNumber}</p>
        </div>
    );
};

export default PerfomanceDiagram;
