"use client";

import Loading from "@/components/loading";
// import Pagination from "@/components/pagination";
import { ITask } from "@/lib/types";
import { fetchUserTasks } from "@/services/Tasks";
import { message, Pagination } from "antd";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const Task = dynamic(() => import("@/components/task"));

function TaskList() {
  const [Tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState(0);

  const {data: session} = useSession();

  const getTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    message.loading({
      key: "fetch-tasks",
      type: "loading",
      content: "Fetching tasks...",
    });
    try {
      const userId = Number(session?.user.id);
      if (isNaN(userId)) {
        throw new Error("Invalid user ID");
      }
      const res = await fetchUserTasks(userId);
      setTasks(res);
      setTotal(res.length);
      message.success({
        key: "fetch-tasks",
        type: "success",
        content: "Tasks fetched successfully",
      });
    } catch (err) {
      if (err instanceof Error) {
        message.error({
          key: "fetch-tasks",
          type: "error",
          content: err.message,
        });
      } else {
        message.error({
          key: "fetch-tasks",
          type: "error",
          content: "An error occurred while fetching tasks",
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks, total]);

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
        <Pagination
          current={page}
          total={total}
          pageSize={limit}
          onShowSizeChange={(_, size) => {
            setLimit(size);
          }}
          onChange={(page) => setPage(page)}
          align="center"
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {Tasks.slice((page - 1) * limit, page * limit).map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default TaskList;
