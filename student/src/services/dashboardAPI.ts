import axios, { AxiosResponse } from "axios";

export const getDashboard = async (): Promise<AxiosResponse> => {
    try {
      const response = await axios.get(
        `https://knoware.live/dashboard`
      );
      return response;
    } catch (error) {
      throw error;
    }
}

export const editRating = async (
    documentId: number,
    rating: number
  ): Promise<AxiosResponse> => {
    try {
      const response = await axios.put(
        `https://knoware.live/rating?document_id=${documentId}&rating=${rating}`);
      return response;
    } catch (error) {
      throw error;
    }
}

export const addComment = async (
    documentId: number,
    comment: string
  ): Promise<AxiosResponse> => {
    try {
      const response = await axios.post(
        `https://knoware.live/comment?document_id=${documentId}&comment=${comment}`);
      return response;
    } catch (error) {
      throw error;
    }
}