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
