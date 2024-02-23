import axios, { AxiosResponse } from "axios";
import authToken from "../login/authToken";

if (localStorage.access_token) {
  authToken(localStorage.access_token);
}

type SearchRequestBody = {
  query: string | null;
  file_format: string | null;
  date: string | null;
  course: string | null;
  label: string | null;
};

export const search = async (
  data: SearchRequestBody
): Promise<AxiosResponse> => {
  try {
    console.log(data);
    const response = await axios.post("http://localhost:8080/search", data, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSearchRecommendation = async (
  data: SearchRequestBody
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/search-recommend",
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
