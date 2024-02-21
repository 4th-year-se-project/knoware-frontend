import axios, { Axios, AxiosResponse } from "axios";
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
      `http://localhost:8080/get_all_resources`,
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

export const getPdf = async (doc_id: number): Promise<AxiosResponse> => {
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

type RecommendedResourcesRequestBody = {
  document_ids: number[];
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

export const getAllComments = async (
  doc_id: number,
  embedding_id: number
): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`http://localhost:8080/get_all_comments?document_id=${doc_id}&embedding_id=${embedding_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return response
  } catch (error) {
    throw error;
  }
}

export const addEmbeddingComment = async (
  doc_id: number,
  embedding_id: number,
  comment: string,
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`http://localhost:8080/add_embedding_comment?document_id=${doc_id}&embedding_id=${embedding_id}&comment=${comment}`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return response
  } catch (error) {
    throw error
  }
}

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