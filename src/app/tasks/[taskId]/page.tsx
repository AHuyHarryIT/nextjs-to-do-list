"use client";
import { ITask } from "@/lib/types";
import { fetchTaskById } from "@/services/Tasks";
import Link from "next/link";
import React, { useMemo, useState } from "react";

interface TaskDetail extends ITask {
  author: string;
}

interface TaskDetailProps {
  params: { taskId: string };
}

function TaskDetail({ params }: TaskDetailProps) {
  const [task, setTask] = useState<TaskDetail>();
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    setLoading(true);
    const getTask = async () => {
      const response = await fetchTaskById(params.taskId);
      setLoading(false);
      if (response && response.data) {
        setTask(response.data);
      }
    };
    getTask();
  }, [params.taskId]);

  return (
    <>
      <Link
        href={"/tasks"}
        className="font-semibold text-blue-500 hover:text-blue-700 hover:underline"
      >
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
            className={`rounded-lg px-1 py-[2px] text-xs font-normal ring-1 ${task.completed ? "bg-green-200 text-green-600 ring-green-600" : "bg-red-200 text-red-500 ring-red-500"} `}
          >
            {task?.completed ? "Completed" : "Not complete"}
          </span>
          <div>
            <strong>ID: </strong> <span>{task?.id}</span>
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
