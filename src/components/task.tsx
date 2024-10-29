import { ITask } from "@/lib/types";
import Link from "next/link";
import React from "react";

interface TaskProps {
  task: ITask;
}

export default function Task({ task }: TaskProps) {
  return (
    <div className="flex flex-col rounded-md border p-3">
      <div className="flex-1">
        <span
          className={`rounded-lg px-1 py-[2px] text-xs font-normal ring-1 ${task.completed ? "bg-green-200 text-green-600 ring-green-600" : "bg-red-200 text-red-500 ring-red-500"} `}
        >
          {task.completed ? "Completed" : "Not Complete"}
        </span>
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
  );
}
