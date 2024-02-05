import { FileInput, Tabs, TextInput, rem } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import React, { useState } from "react";
import { embedFile, embedYoutube } from "../services/embedAPI";

type Props = {
  onClose: () => void; // Callback function to close the modal
};

function UploadModal(props: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadFile = async () => {
    try {
      if (file) {
        // Check if file is not null
        const embed = await embedFile(file);
        setIsUploading(false);
        console.log("File uploaded successfully!");
        // setSuccess(true);
        // setAlert(true);
      } else {
        // Handle the case where file is null (e.g., show an error message)
        console.error("No file selected for embedding.");
        setIsUploading(false);
        // setSuccess(false);
        // setAlert(true);
      }
    } catch (error: any) {
      console.error("Error embedding file:", error);

      if (error.response && error.response.status === 400) {
        //   setEmbedError("This resource already exists in your resource space!");
        // } else {
        //   setEmbedError(
        //     "Something went wrong with uploading your resource. Please try again."
        //   );
      }
      // setIsUploading(false);
      // setSuccess(false);
      // setAlert(true);
    }
  };

  const uploadYoutube = async () => {
    try {
      const data = {
        video_url: url,
      };
      const embed = await embedYoutube(data);
      setIsUploading(false);
      // setSuccess(true);
      // setAlert(true);
    } catch (error) {
      console.error("Error embedding YouTube video:", error);
      setIsUploading(false);
      // setSuccess(false);
      // setAlert(true);
    }
  };

  return (
    <div>
      <p className="font-bold">Upload a Resource</p>
      <Tabs color="indigo" defaultValue="upload">
        <Tabs.List>
          <Tabs.Tab value="upload">Upload a File</Tabs.Tab>
          <Tabs.Tab value="url">Paste YouTube URL</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="upload" pt="xs">
          <FileInput
            label="Your file"
            placeholder="Click to add file"
            icon={<IconUpload size={rem(14)} />}
            onChange={(file) => setFile(file)}
          />
          <button
            onClick={() => {
              setIsUploading(true);
              uploadFile();
              props.onClose();
            }}
            className="mt-4  bg-[#5452FF] hover:bg-[#4744f9] text-white font-semibold py-2 px-4 rounded-md w-full"
          >
            Add Resource
          </button>
        </Tabs.Panel>

        <Tabs.Panel value="url" pt="xs">
          <TextInput
            label="YouTube URL"
            placeholder="Paste a YouTube URL"
            onChange={(event) => setUrl(event.target.value)}
          />
          <button
            onClick={() => {
              //   setIsUploading(true);
              uploadYoutube();
              props.onClose();
            }}
            className="mt-4 bg-[#5452FF] hover:bg-[#4744f9] text-white font-semibold py-2 px-4 rounded-md w-full"
          >
            Add Resource
          </button>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default UploadModal;
