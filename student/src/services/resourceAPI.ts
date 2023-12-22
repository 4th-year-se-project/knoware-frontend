import axios, { AxiosResponse } from "axios";
import authToken from "../login/authToken";

if (localStorage.access_token) {
  authToken(localStorage.access_token);
}

type RecommendedResourcesRequestBody = {
  document_id: number;
};

export const getCourseDetails = async (
  documentId: number
): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(
      `https://knoware.live/course?document_id=${documentId}`, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
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
      `https://knoware.live/resource-info?document_id=${documentId}&query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
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
      `https://knoware.live/resource?document_id=${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
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
      `https://knoware.live/topic?document_id=${documentId}&topic=${topic}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};

export const getPdf = async (doc_id: string): Promise<AxiosResponse> => {
  console.log(doc_id);
  try {
    const response = await axios.get(
      `https://knoware.live/getPdf?document_id=${doc_id}`,
      {
        responseType: "blob", // Set response type to blo
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};

export const getRecommendedResources = async (
  data: RecommendedResourcesRequestBody
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post("https://knoware.live/recommend", data, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return response;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
};
