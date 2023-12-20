import axios, { AxiosResponse } from "axios";
import authToken from "../login/authToken";

if (localStorage.access_token) {
  authToken(localStorage.access_token);
}

type SearchRequestBody = {
  query: string;
};

export const search = async (
  data: SearchRequestBody
): Promise<AxiosResponse> => {
  try {
    console.log(data);
    const response = await axios.post("http://localhost:8001/search", data, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
