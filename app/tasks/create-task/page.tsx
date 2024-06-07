"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TaskFormInputs {
    title: string;
    message: string;
    status?: string; // Optional field for status
}

const CreateTaskPage: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormInputs>();

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = date + "-" + month + "-" + year;

    const onSubmit: SubmitHandler<TaskFormInputs> = data => {
        // Add status to the task data
        

        // Save task to local storage
        const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        const taskWithStatus = {
            ...data,
            status: 'active',
            time: currentDate,
            id: existingTasks.length + 1
        };

        const newTasks = [...existingTasks, taskWithStatus];
        localStorage.setItem('tasks', JSON.stringify(newTasks));

        // Reset form fields
        reset();

        // Show success notification
        toast.success('Task added successfully!');
    };

    return (
        <div className="max-w-xl space-y-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <input
                        {...register('title', { required: 'Title is required' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Title"
                    />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                </div>

                <div className="mb-4">
                    <textarea
                        {...register('message', { required: 'Message is required' })}
                        id="message"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your message..."
                    />
                    {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Enter New Task
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateTaskPage;
