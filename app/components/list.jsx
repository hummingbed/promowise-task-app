
import React, { useEffect, useState } from "react";


const TableChartComponent = () => {

  const [latestTasks, setLatestTasks] = useState([]);

  useEffect(() => {

    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    const latestTasks = tasksFromLocalStorage.slice(-5).reverse();
    setLatestTasks(latestTasks);
  }, []);

  return (
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-4">Latest Tasks</h2>
      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {latestTasks.map((task, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : task.status === "Active"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">{task.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableChartComponent;
