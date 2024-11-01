import axiosInstance from "./custom-axios";

export const fetchAllTasks = () => {
  return axiosInstance
    .get("/todos")
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.status === 404) {
        throw new Error("Tasks not found");
      }
      throw error;
    });
};

export const fetchTaskById = (id: string) => {
  return axiosInstance
    .get(`/todos/${id}`)
    .then(async (response) => {
      await axiosInstance.get(`/users/${response.data.userId}`).then((user) => {
        response.data.author = user.data.name;
      });
      response.data;
    })
    .catch((error) => {
      if (error.response.status === 404) {
        throw new Error("This task not found");
      }
      throw error;
    });
};
