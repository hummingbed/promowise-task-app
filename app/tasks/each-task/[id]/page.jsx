"use client"

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const ViewTaskPage = () => {
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");

  const router = useParams();
  const taskId = router.id;

  useEffect(() => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    const foundTask = tasksFromLocalStorage.find((task) => task.id == taskId);
    if (foundTask) {
      setTask(foundTask);
      setUpdatedStatus(foundTask.status); 
    }
  }, [taskId]);

  const handleEdit = () => {
    setIsEditing(true);
    setUpdatedTitle(task.title);
    setUpdatedMessage(task.message);
    setUpdatedStatus(task.status);
  };

  const handleUpdate = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasksFromLocalStorage.map((t) =>
      t.id == taskId ? { ...t, title: updatedTitle, message: updatedMessage, status: updatedStatus } : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask({ ...task, title: updatedTitle, message: updatedMessage, status: updatedStatus });
    setIsEditing(false);
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between w-full h-screen p-4">
      {/* Left Component */}
      <div className="w-1/2 bg-gray-100 p-6 rounded shadow-md">
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="mb-4 w-full p-2 border rounded"
            />
            <textarea
              value={updatedMessage}
              onChange={(e) => setUpdatedMessage(e.target.value)}
              className="mb-4 w-full p-2 border rounded"
            />
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
              className="mb-4 w-full p-2 border rounded"
            >
              <option value="Active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-4">{task.title}</h1>
            <p className="text-gray-700 mb-6">{task.message}</p>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
                }`}
            >
              {task.status}
            </span><br />
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-700 mt-4"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewTaskPage;
