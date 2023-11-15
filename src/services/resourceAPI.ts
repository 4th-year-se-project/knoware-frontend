import axios, { AxiosResponse } from "axios";

export const getCourseDetails = async (
  documentId: number
): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(
      `http://64.227.140.108/course?document_id=${documentId}`
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
      `http://64.227.140.108/resource-info?document_id=${documentId}&query=${query}`
    );
    return response;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};

export const deleteResource = async (
  documentId: number
): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(
      `http://64.227.140.108/resource?document_id=${documentId}`
    );
    return response;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};

export const editTopic = async (
  documentId: number,
  topic: string
): Promise<AxiosResponse> => {
  try {
    const response = await axios.put(
      `http://64.227.140.108/topic?document_id=${documentId}&topic=${topic}`
    );
    return response;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};

export const getPdf = async (
  filename: string,
): Promise<AxiosResponse> => {
  console.log(filename)
  try {
    const response = await axios.get(
      `http://64.227.140.108/getPdf?filename=${filename}`,   {
        responseType: 'blob', // Set response type to blob
      }
    );
    return response;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};


