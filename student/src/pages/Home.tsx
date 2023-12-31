import React, { useState } from "react";
import Logo from "../assets/images/logo.svg";
import {
  Group,
  Modal,
  Tabs,
  FileInput,
  rem,
  TextInput,
  Progress,
  Button,
} from "@mantine/core";
import { IconFilePlus, IconUpload } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import SearchBar from "../components/SearchBar";
import { embedFile, embedYoutube } from "../services/embedAPI";
import EmbedAlert from "../components/EmbedAlert";

type Props = {};

const Home = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);
  const [alert, setAlert] = useState<boolean>(false);
  const [embedError, setEmbedError] = useState<string>("")

  const uploadYoutube = async () => {
    try {
      const data = {
        video_url: url,
      };
      const embed = await embedYoutube(data);
      setIsUploading(false);
      setSuccess(true);
      setAlert(true);
    } catch (error) {
      console.error("Error embedding YouTube video:", error);
      setIsUploading(false);
      setSuccess(false);
      setAlert(true);
    }
  };

  const uploadFile = async () => {
    try {
      if (file) {
        // Check if file is not null
        const embed = await embedFile(file);
        setIsUploading(false);
        setSuccess(true);
        setAlert(true);
      } else {
        // Handle the case where file is null (e.g., show an error message)
        console.error("No file selected for embedding.");
        setIsUploading(false);
        setSuccess(false);
        setAlert(true);
      }
    } catch (error: any) {
      console.error("Error embedding file:", error);

      if (error.response && error.response.status === 400) {
        setEmbedError("This resource already exists in your resource space!");
      } else {
        setEmbedError("Something went wrong with uploading your resource. Please try again.");
      }
      setIsUploading(false);
      setSuccess(false);
      setAlert(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={Logo} alt="logo" width={400} />
      {isUploading ? (
        <>
          <Progress
            className="mt-4 mb-4"
            value={100}
            striped
            animate
            size="xl"
            radius="xl"
            color="indigo"
            label="P A R S I N G"
            style={{
              width: "400px",
              height: "30px",
            }}
          />
          <Button variant="outline" color="red" radius="lg" size="xs">
            Cancel
          </Button>
        </>
      ) : (
        <Group className="flex items-center">
          <IconFilePlus
            className="opacity-70 mt-4 cursor-pointer"
            onClick={open}
          />
          <SearchBar long={true} />
        </Group>
      )}
      <Modal opened={opened} onClose={close} title="Add a resource" centered>
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
                close();
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
                setIsUploading(true);
                uploadYoutube();
                close();
              }}
              className="mt-4 bg-[#5452FF] hover:bg-[#4744f9] text-white font-semibold py-2 px-4 rounded-md w-full"
            >
              Add Resource
            </button>
          </Tabs.Panel>
        </Tabs>
      </Modal>
      {alert &&
        EmbedAlert({ success: success, errorMessage: embedError, onClose: () => setAlert(false) })}
    </div>
  );
};

export default Home;
