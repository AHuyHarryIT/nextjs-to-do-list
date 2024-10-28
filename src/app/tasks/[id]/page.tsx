"use client";
import { Task } from "@/lib/types";
import { fetchTaskById } from "@/services/Tasks";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface TaskDetail extends Task {
  author: string;
}

function TaskDetail({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<TaskDetail>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getTask = async () => {
      const response = await fetchTaskById(params.id).finally(() => {
        setLoading(false);
      });
      if (response && response.data) {
        setTask(response.data);
      }
    };

    getTask();
  }, [params.id]);

  return (
    <>
      <Link
        href={"/tasks"}
        className="font-semibold text-blue-500 hover:text-blue-700 hover:underline"
      >
        {" "}
        {`< Back`}
      </Link>
      {loading ? (
        <h1 className="font-bold">Loading...</h1>
      ) : !task ? (
        <h1 className="italic text-red-500">--- Task not found ---</h1>
      ) : (
        <div className="">
          <h1 className="text-xl font-semibold">
            <span>{task.title}</span>
          </h1>
          <span
            className={`rounded-lg px-1 text-xs font-normal ring-1 ${task?.completed ? "bg-green-200 text-green-600 ring-green-600" : "bg-red-200 text-red-500 ring-red-500"} `}
          >
            {task?.completed ? "Completed" : "Not complete"}
          </span>
          <div>
            <strong>Id: </strong> <span>{task?.id}</span>
          </div>
          <p>
            <strong>Author:</strong> <span>{task?.author}</span>
          </p>
        </div>
      )}
    </>
  );
}

export default TaskDetail;
