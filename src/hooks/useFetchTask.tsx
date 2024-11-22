import { ITask } from "@/lib/types";
import { useState, useEffect } from "react";

const cache = new Map();

const fetchAllTasks = async () => {
  const cacheKey = "allTasks";
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

const useFetchAllTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllTasks();
        setTasks(data);
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tasks, loading, error };
};

export default useFetchAllTasks;