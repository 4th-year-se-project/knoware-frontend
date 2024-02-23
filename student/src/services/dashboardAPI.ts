import axios, { AxiosResponse } from "axios";

export const getDashboard = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`http://localhost:8080/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const editRating = async (
  documentId: number,
  rating: number
): Promise<AxiosResponse> => {
  try {
    const response = await axios.put(
      `http://localhost:8080/rating?document_id=${documentId}&rating=${rating}`,
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

export const addComment = async (
  documentId: number,
  comment: string
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      `http://localhost:8080/comment?document_id=${documentId}&comment=${comment}`,
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

export const addCourseDetails = async (
  courses: any
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      `http://localhost:8080/course`,
      {
        courses,
      },
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

export const getCourses = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get("http://localhost:8080/courses");
    return response;
  } catch (error) {
    throw error;
  }
};
