import axiosInstance from "./custom-axios";

export const fetchAllTasks = async () => {
  try {
    const response = await axiosInstance.get("/todos");
    const tasks = await response.data;
    return tasks;
  } catch (error) {
    throw error;
  }
};

export const fetchTaskById = async (id: string) => {
  try {
    const taskResponse = await axiosInstance.get(`/todos/${id}`);
    const task = await taskResponse.data;
    const userResponse = await axiosInstance.get(`/users/${task.userId}`);
    const user = await userResponse.data;
    task.author = user.name;
    return task;
  } catch (error) {
    throw error;
  }
};

export const fetchUserTasks = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}/todos`);
    const tasks = await response.data;
    return tasks;
  } catch (error) {
    throw error;
  }
};
