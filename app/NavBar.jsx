"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiCalendarTodoLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";

const NavBar = () => {
    const currentPath = usePathname();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];
            setTasks(tasksFromLocalStorage);
        }
    }, []);

    const links = [
        { href: "/", label: "Tasks" },
        { href: "/dashboard", label: "Dashboard" },
    ];

    if (tasks.length == 0) {
        return (
            <nav className="flex justify-center sm:justify-start border-b mb-5 px-5 py-3 h-14 items-center">
                <Link href="/" className="mr-auto sm:mr-0"><RiCalendarTodoLine /></Link>
                <ul className="flex space-x-6 ml-4">
                    <Link href="/tasks">
                        <li className="text-zinc-900">Tasks</li>
                    </Link>
                </ul>
            </nav>
        );
    }

    return (
        <nav className="flex justify-center sm:justify-start border-b mb-5 px-5 py-3 h-14 items-center">
            <Link href="/" className="mr-auto sm:mr-0"><RiCalendarTodoLine /></Link>
            <ul className="flex space-x-6 ml-4">
                {links.map((link) => (
                    <li
                        key={link.href}
                        className={`${link.href === currentPath ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-800 transition-colors"}`}
                    >
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
