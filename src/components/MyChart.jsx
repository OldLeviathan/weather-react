import React, {useEffect, useState} from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function MyChart(props) {

    useEffect(()=>{
        const timer = setInterval(() => {
            let newData = data
            let newTime = new Date().getHours()
            if(newData.length < 5 && props.temp !== undefined){
                newData.push({time: newTime, temp: props.temp, Температура:props.temp})
                setData(newData)
            } else if (props.temp !== undefined) {
                newData.shift()
                newData.push({time:Date.now(), temp: props.temp, Температура:props.temp})
                setData(newData)
            }
            return ()=> clearInterval(timer)
        }, 5000);
    })

    const [data, setData] = useState([])

    return (
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="time"/>
            <YAxis dataKey="temp"/>
            <Tooltip/>
            <Legend/>
            <Line
                type="monotone"
                dataKey="Температура"
                stroke="#FFFAFA"
                activeDot={{r: 8}}
            />
        </LineChart>
    );
}



export default MyChart;