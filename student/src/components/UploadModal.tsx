import { FileInput, Tabs, TextInput, rem } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { embedFile, embedYoutube } from "../services/embedAPI";
import { useDispatch } from "react-redux";
import { addFileStatus } from "../slices/fileStatusSlice";

type Props = {
  onClose: () => void; // Callback function to close the modal
};

function UploadModal(props: Props) {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const uploadFile = async () => {
    let fileInfo: { name: string; size: number } | undefined;
    const abortController = new AbortController();

    if (file) {
      console.log(file.name);
      setIsUploading(true);
      fileInfo = { name: file.name, size: file.size };

      dispatch(
        addFileStatus({
          fileInfo: fileInfo,
          status: "uploading",
          abortController,
        })
      );

      try {
        const embed = await embedFile(file, abortController.signal);

        dispatch(addFileStatus({ fileInfo, status: "success" }));
        setIsUploading(false);

        console.log("File uploaded successfully!");
      } catch (error: any) {
        if (error.name === "CanceledError") {
          console.error("Upload cancelled:", error);

          dispatch(addFileStatus({ fileInfo: fileInfo, status: "cancelled" }));
        } else {
          console.error("Error embedding file:", error);

          dispatch(addFileStatus({ fileInfo: fileInfo, status: "error" }));
        }

        setIsUploading(false);
      }
    } else {
      console.error("No file selected for embedding.");
      setIsUploading(false);
    }
  };

  const uploadYoutube = async () => {
    let fileInfo: { name: string; size: number } | undefined;

    setIsUploading(true);

    try {
      const data = {
        video_url: url,
      };
      const embed = await embedYoutube(data);

      dispatch(addFileStatus({ fileInfo: fileInfo, status: "success" }));
    } catch (error) {
      console.error("Error embedding YouTube video:", error);

      dispatch(addFileStatus({ fileInfo: fileInfo, status: "error" }));
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div>
      <p className="font-bold mb-3">Upload a Resource</p>
      <Tabs color="indigo" defaultValue="upload">
        <Tabs.List>
          <Tabs.Tab value="upload">Upload a File</Tabs.Tab>
          <Tabs.Tab value="url">Paste YouTube URL</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="upload" pt="xs">
          <FileInput
            label="Your file"
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
