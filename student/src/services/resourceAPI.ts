import axios, { AxiosResponse } from "axios";

export const getCourseDetails = async (
  documentId: number
): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/course?document_id=${documentId}`
    );
    return response;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};

export const getResourceInfo = async (
  documentId: number,
  query: string
): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/resource-info?document_id=${documentId}&query=${query}`
    );
    return response;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};
