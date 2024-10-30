"use client";
import Loading from "@/components/loading";
import { ITask } from "@/lib/types";
import { fetchTaskById } from "@/services/Tasks";
import React, { useCallback, useEffect, useState } from "react";

interface TaskDetail extends ITask {
  author: string;
}

interface TaskDetailProps {
  params: { taskId: string };
}

function TaskDetail({ params }: TaskDetailProps) {
  const [task, setTask] = useState<TaskDetail>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTask = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchTaskById(params.taskId);
      setTask(res);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [params.taskId]);

  useEffect(() => {
    getTask();
  }, [getTask]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center">
        <h1 className="font-bold text-red-500">{error}</h1>
        <button
          onClick={getTask}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    task && (
      <>
        <h1 className="text-xl font-semibold">
          <span>{task.title}</span>
        </h1>
        <span
          className={`rounded-lg px-1 py-[2px] text-xs font-normal ring-1 ${task.completed ? "bg-green-200 text-green-600 ring-green-600" : "bg-red-200 text-red-500 ring-red-500"} `}
        >
          {task.completed ? "Completed" : "Not complete"}
        </span>
        <div>
          <strong>ID: </strong> <span>{task.id}</span>
        </div>
        <p>
          <strong>Author:</strong> <span>{task.author}</span>
        </p>
      </>
    )
  );
}

export default TaskDetail;
