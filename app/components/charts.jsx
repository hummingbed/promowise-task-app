"use client";

import React, { useEffect, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const ChartComponent = () => {
    const [allTasksCount, setAllTasksCount] = useState(0);
    const [activeTasksCount, setActiveTasksCount] = useState(0);
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Retrieve tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Calculate task statistics
        const allTasks = tasks.length;
        const activeTasks = tasks.filter(task => task.status === 'active').length;
        const completedTasks = tasks.filter(task => task.status === 'completed').length;

        // Update state
        setAllTasksCount(allTasks);
        setActiveTasksCount(activeTasks);
        setCompletedTasksCount(completedTasks);
        setChartData([
            { name: 'All Tasks', uv: allTasks },
            { name: 'Active Tasks', uv: activeTasks },
            { name: 'Completed Tasks', uv: completedTasks },
        ]);
    }, []);

    return (
        <main>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <div className="p-5 bg-white shadow rounded text-center">
                    <h3 className="font-bold">All Tasks</h3>
                    <p>{allTasksCount} tasks</p>
                </div>
                <div className="p-5 bg-white shadow rounded text-center">
                    <h3 className="font-bold">Active Tasks</h3>
                    <p>{activeTasksCount} tasks</p>
                </div>
                <div className="p-5 bg-white shadow rounded text-center">
                    <h3 className="font-bold">Completed Tasks</h3>
                    <p>{completedTasksCount} tasks</p>
                </div>
            </div>

            <div className="bg-white shadow rounded p-5" style={{ maxWidth: '600px', overflowX: 'scroll' }}>
                <BarChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
        </main>
    );
};

export default ChartComponent;
