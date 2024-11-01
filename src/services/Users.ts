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

export const fetchUserById = (id: string) => {
  return axiosInstanceWithoutToken
    .get(`/users/${id}`)
    .then( (response) => {
       response.data;
    })
    .catch((error) => {
      if (error.response.status === 404) {
        throw new Error("User not found");
      }
      throw error;
    });
};

export const fetchUserByUsername = (username:string)=>{
    return axiosInstanceWithoutToken
    .get(`/users?username=${username}`)
    .then(response=> response.data)
    .catch(error=>{
        if(error.response.status===404){
            throw new Error("User not found")
        }
        throw error
    })
}
