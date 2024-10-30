import axios from "./custom-axios";

export const fetchAllTasks = () => {
  return axios
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
  return axios
    .get(`/todos/${id}`)
    .then(async (response) => {
      await axios.get(`/users/${response.data.userId}`).then((user) => {
        response.data.author = user.data.name;
      });
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 404) {
        throw new Error("This task not found");
      }
      throw error;
    });
};
