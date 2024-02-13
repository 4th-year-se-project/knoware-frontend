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
      `http://localhost:8080/course?document_id=${documentId}`,
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

export const getAllResources = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/get-all-resources`,
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
      `http://localhost:8080/resource-info?document_id=${documentId}&query=${query}`,
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
      `http://localhost:8080/resource?document_id=${documentId}`,
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
      `http://localhost:8080/topic?document_id=${documentId}&topic=${topic}`,
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
      `http://localhost:8080/getPdf?document_id=${doc_id}`,
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
    const response = await axios.post("http://localhost:8080/recommend", data, {
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

export const getAllCoursess = async () : Promise<AxiosResponse> => {
  try{
    const response = await axios.get(
      `http://localhost:8080/get-all-courses`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error
  }
}

export const editResourceLabel = async (document_id: number , label: string | null) : Promise<AxiosResponse> => {
  try {
    const response = await axios.put(`http://localhost:8080/update-label?document_id=${document_id}&label=${label}`);
    return response;
  } catch (error) {
    throw error;
  }
}