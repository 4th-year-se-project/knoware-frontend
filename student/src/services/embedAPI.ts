import axios, { AxiosResponse } from "axios";

type YouTubeRequestBody = {
  video_url: string;
};

export const embedYoutube = async (
  data: YouTubeRequestBody
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/embed_youtube",
      data
    );
    return response;
  } catch (error) {
    // Handle errors here, e.g., log them or show an error message to the user
    throw error;
  }
};

export const embedPDF = async (file: File): Promise<AxiosResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "http://localhost:8080/embed_pdf",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    // Handle errors here, e.g., log them or show an error message to the user
    throw error;
  }
};

export const embedDoc = async (file: File): Promise<AxiosResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "http://localhost:8080/embed_docx",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    // Handle errors here, e.g., log them or show an error message to the user
    throw error;
  }
};

export const embedPPT = async (file: File): Promise<AxiosResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "http://localhost:8080/embed_pptx",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    // Handle errors here, e.g., log them or show an error message to the user
    throw error;
  }
};

export const embedAudio = async (file: File): Promise<AxiosResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "http://localhost:8080/embed_audio",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    // Handle errors here, e.g., log them or show an error message to the user
    throw error;
  }
};
