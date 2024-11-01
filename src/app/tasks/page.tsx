"use client";

import Loading from "@/components/loading";
import Pagination from "@/components/pagination";
import { ITask } from "@/lib/types";
import { fetchAllTasks } from "@/services/Tasks";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Task = dynamic(() => import("@/components/task"));

function TaskList() {
  const [Tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchAllTasks();
      setTasks(res);
      setTotal(res.length);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && Tasks.length === 0) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center">
        <h1 className="font-bold text-red-500">{error}</h1>
        <button
          onClick={getTasks}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {total > limit && (
          <Pagination limit={limit} setSkip={setSkip} total={total} />
        )}
        <ul className="grid gap-3 sm:grid-cols-2">
          {Tasks.slice(skip, skip + limit).map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default TaskList;
