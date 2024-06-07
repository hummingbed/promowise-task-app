"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaDirections, FaTrash } from "react-icons/fa";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [latestTasks, setLatestTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    const latestTasks = tasksFromLocalStorage.reverse();
    setTasks(tasksFromLocalStorage);
    setLatestTasks(latestTasks);
  }, []);

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === "All") {
      setLatestTasks(tasks.reverse());
    } else {
      const filteredTasks = tasks.filter((task) => task.status === status);
      setLatestTasks(filteredTasks.reverse());
    }
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setLatestTasks(updatedTasks.slice(-5).reverse());
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="container mx-auto p-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        <Link href="/tasks/create-task">New Task</Link>
      </button>

      <div className="flex-1">
        <div className="my-4 flex justify-between items-center">
          {/* Filter buttons */}
          <div>
            <button
              onClick={() => handleFilterChange("All")}
              className={`mr-2 px-3 py-1 rounded ${filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("completed")}
              className={`mr-2 px-3 py-1 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
            >
              Completed
            </button>
            <button
              onClick={() => handleFilterChange("active")}
              className={`px-3 py-1 rounded ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
            >
              Active
            </button>
          </div>
        </div>
        <div className="overflow-y-auto max-h-96">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Edit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Delete
                </th>


              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {latestTasks.map((task, index) => (
                <tr key={index}>
                  <td className="px-6 text-center py-4 whitespace-nowrap">{task.title}</td>
                  <td className="px-6 text-center py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "active"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">{task.time}</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link href={`/tasks/each-task/${task.id}`}>
                      <button><FaDirections /></button>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button onClick={() => handleDelete(task.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
