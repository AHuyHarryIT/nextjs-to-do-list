import axios from "./custom-axios";

export const fetchAllTasks = async () => {
  return await axios.get("/todos");
};

export const fetchTaskById = async (id: string) => {
  return await axios
    .get(`/todos/${id}`)
    .then(async (response) => {
      await axios.get(`/users/${response.data.userId}`).then((user) => {
        response.data.author = user.data.name;
      });
      return response;
    })
    .catch((error) => {
      if (error.response.status === 404) {
        return null;
      }
      throw error;
    });
};
