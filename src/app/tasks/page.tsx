"use client";

import { Task } from "@/lib/types";
import { fetchAllTasks as fetchAllTasks } from "@/services/Tasks";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ToDoList() {
  const [Tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setLoading(true);

    const response = await fetchAllTasks().finally(() => {
      setLoading(false);
    });

    if (response && response.data) {
      setTasks(response.data);
    }
  };

  return (
    <>
      <h1 className="mb-3 text-3xl font-bold">Tasks</h1>
      {loading ? (
        <h1 className="font-bold">Loading...</h1>
      ) : (
        <div className="grid gap-3">
          {Tasks.map((task) => (
            <div key={task.id} className="flex flex-col rounded-md border p-3">
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    task.completed ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {task.completed ? "Completed" : "Not Completed"}
                </p>
                <h1 className="text-xl font-semibold">{task.title}</h1>
              </div>
              <div className="text-right">
                <Link
                  href={`/tasks/${task.id}`}
                  className="font-semibold text-blue-500 hover:text-blue-700 hover:underline"
                >
                  More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ToDoList;
