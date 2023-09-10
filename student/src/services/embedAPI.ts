import axios, { AxiosResponse } from "axios";

type YouTubeRequestBody = {
  video_url: string;
};

const endpointMapping: Record<string, string> = {
  pdf: "embed_pdf",
  docx: "embed_docx",
  pptx: "embed_pptx",
  audio: "embed_audio",
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

export const embedFile = async (file: File): Promise<AxiosResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Get the file extension (e.g., "pdf", "docx", "pptx", "audio")
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    // Check if the file extension is supported
    if (fileExtension && endpointMapping[fileExtension]) {
      const endpoint = endpointMapping[fileExtension];
      const response = await axios.post(
        `http://localhost:8080/${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
