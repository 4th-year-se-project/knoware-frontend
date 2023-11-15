import axios, { AxiosResponse } from "axios";

type SearchRequestBody = {
  query: string;
};

export const search = async (
  data: SearchRequestBody
): Promise<AxiosResponse> => {
  try {
    console.log(data);
    const response = await axios.post("http://64.227.140.108/search", data);
    return response;
  } catch (error) {
    throw error;
  }
};
