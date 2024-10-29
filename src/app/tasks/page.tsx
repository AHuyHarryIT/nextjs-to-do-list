"use client";

import { ITask } from "@/lib/types";
import { fetchAllTasks } from "@/services/Tasks";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Pagination from "@/components/pagination";

const Task = dynamic(() => import("@/components/task"));

function TaskList() {
  const [Tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);

  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);

  useMemo(() => {
    const getTasks = async () => {
      setLoading(true);

      const response = await fetchAllTasks();
      setLoading(false);

      if (response && response.data) {
        setTasks(response.data);

        setTotal(response.data.length);
      }
    };
    getTasks();
  }, []);

  return (
    <>
      <h1 className="mb-3 text-3xl font-bold">Tasks</h1>
      {loading ? (
        <h1 className="font-bold">Loading...</h1>
      ) : (
        <div className="space-y-4">
          <Pagination limit={limit} setSkip={setSkip} total={total} />
          <div className="grid gap-3 sm:grid-cols-2">
            {Tasks.slice(skip, skip + limit).map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TaskList;
