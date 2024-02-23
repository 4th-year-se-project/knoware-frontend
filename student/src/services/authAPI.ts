import axios, { AxiosResponse } from "axios";

export const signin = async (email: string, password: string): Promise<AxiosResponse> => {
  try {
    const data = {
        username: email,
        password: password
    }
    const response = await axios.post("http://localhost:8080/login", data)
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AxiosResponse> => {
  try {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    const response = await axios.post("http://localhost:8080/register", data);
    return response;
  } catch (error) {
    throw error;
  }
};
