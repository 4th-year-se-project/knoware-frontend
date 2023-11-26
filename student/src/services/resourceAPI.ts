import axios, { AxiosResponse } from "axios";
import authToken from "../login/authToken";

if (localStorage.access_token) {
  authToken(localStorage.access_token);
}

export const getCourseDetails = async (
  documentId: number
): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/course?document_id=${documentId}`, 
      {
        headers: {
          "Authorization": `Bearer ${localStorage.access_token}`
        }
      }
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
      `http://localhost:8080/resource-info?document_id=${documentId}&query=${query}`,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.access_token}`
        }
      }
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
      `http://localhost:8080/resource?document_id=${documentId}`,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.access_token}`
        }
      }
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
      `http://localhost:8080/topic?document_id=${documentId}&topic=${topic}`,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.access_token}`
        }
      }
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
      `http://localhost:8080/getPdf?filename=${filename}`,   {
        responseType: 'blob', // Set response type to blo
        headers: {
          "Authorization": `Bearer ${localStorage.access_token}`
        }
        
      }
    );
    return response;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};


