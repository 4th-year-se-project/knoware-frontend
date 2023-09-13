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
