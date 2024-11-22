import { axiosInstanceWithoutToken } from "./custom-axios";

export const fetchAllUsers = () => {
  return axiosInstanceWithoutToken
    .get("/users")
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.status === 404) {
        throw new Error("Not found any user");
      }
      throw error;
    });
};

export const fetchUserById = async (id: string) => {
  try {
    const response = await axiosInstanceWithoutToken.get(`/users/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserByUsername = async (username: string) => {
  try {
    const response = await axiosInstanceWithoutToken.get(
      `/users?username=${username}`,
    );
    const data = await response.data;
    return data;
  } catch (error) {
    throw error;
  }
};
