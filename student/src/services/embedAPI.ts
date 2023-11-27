import axios, { AxiosResponse } from "axios";
import authToken from "../login/authToken";

if (localStorage.access_token) {
  authToken(localStorage.access_token);
}

type YouTubeRequestBody = {
  video_url: string;
};

const endpointMapping: Record<string, string> = {
  pdf: "embed_pdf",
  docx: "embed_docx",
  pptx: "embed_pptx",
  mp3: "embed_audio",
  mp4: "embed_audio",
  mpeg: "embed_audio",
  mpga: "embed_audio",
  m4a: "embed_audio",
  wav: "embed_audio",
  webm: "embed_audio",
};

export const embedYoutube = async (
  data: YouTubeRequestBody
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/embed_youtube",
      data,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.access_token}`
        }
      }
    );
    return response;
  } catch (error) {
    // Handle errors here, e.g., log them or show an error message to the user
    throw error;
  }
};

export const embedFile = async (file: File): Promise<AxiosResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension && endpointMapping[fileExtension]) {
      const endpoint = endpointMapping[fileExtension];
      const response = await axios.post(
        `http://localhost:8080/${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.access_token}`
          },
        }
      );
      return response;
    } else {
      throw new Error("Unsupported file type");
    }
  } catch (error) {
    // Handle errors here, e.g., log them or show an error message to the user
    throw error;
  }
};
