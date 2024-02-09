import { SearchBar } from "../components";
import HeaderBar from "../components/HeaderBar";
import Masonry from "react-responsive-masonry";
import AudioResource from "../components/AudioResource";
import DefaultResource from "../components/DefaultResource";
import { Modal, Title, rem, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import ResourceModal from "../components/ResourceModal";
import { IconPhoto } from "@tabler/icons-react";
import UploadModal from "../components/UploadModal";
import { getAllResources } from "../services/resourceAPI";
import { search } from "../services/searchAPI";
import Filter from "../components/Filter";

const Home = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState("null");
  const [resources, setResources] = useState<any[]>([]);
  const [showingResources, setShowingResources] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeResource, setActiveResource] = useState<any>({
    name: "",
    image: "",
    topic: "",
    course: "",
    content: "",
  });

  const [fileFormat, setFileFormat] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [source, setCourse] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    console.log("Search query:", query);
    setSearchQuery(query);
    const searchResults = await search({ query: query });
    setShowingResources(searchResults.data.results);
  }, []);

  const getResources = async () => {
    const res = await getAllResources();
    console.log(res);
    setResources(res.data.results);
    setShowingResources(res.data.results);
  };

  useEffect(() => {
    getResources();
  }, []);

  const handleResourceClick = (resourceType: string, resource: any) => {
    setActiveResource({
      name: resource.title,
      topic: resource.topic,
      course: resource.course,
      image: resource.url || `data:image/png;base64, ${resource.page_image}`,
      content: resource.content,
    });
    setModalContent(resourceType);
    open();
  };

  const closeModal = () => {
    close();
  };

  const handleFilter = (fileFormat: any, date: any, course: any, label: any) => {
    setFileFormat(fileFormat);
    setDate(date);
    setCourse(course);
    setLabel(label);
    // setResources([])

    const filteredResources = resources.filter((resource) => {
      // const typeMatch = fileFormat ? resource.type === fileFormat : true;
      // const dateMatch = true;
      const topicMatch = course ? resource.topic === course : true;
      // const labelMatch = label ? resource.label === label : true;

      // return typeMatch || dateMatch || topicMatch || labelMatch;
      return topicMatch;
    });

    setShowingResources(filteredResources);
  };

  const renderModalContent = () => {
    if (modalContent === "upload") {
      // Render upload component here
      return <UploadModal onClose={closeModal} />;
    } else if (modalContent === "resource") {
      // Render resource component here
      return (
        <ResourceModal
          name={activeResource.name}
          topic={activeResource.topic}
          course={activeResource.course}
          image={activeResource.image}
          content={activeResource.content}
          onClose={closeModal}
        />
      );
    }
    // Default case, no specific content to render
    return null;
  };

  return (
    <div>
      <HeaderBar onLogoClick={() => null} />
      <div className="flex items-center justify-between px-40">
        <div className="flex items-center">
          <SearchBar long={true} onSearch={handleSearch} />
        </div>
        <div className="flex items-center mt-6">
          <Group
            onClick={() => handleResourceClick("upload", {})}
            className="border-4 cursor-pointer border-dashed rounded-xl p-2 text-blue-500 border-blue-500"
          >
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
              size="6rem"
            />
            <p>Upload a Resource</p>
          </Group>
        </div>
      </div>
      <Filter handleCallback={handleFilter} />
      <Title order={1} className="px-40">
        {searchQuery ? `Results for "${searchQuery}"` : "Your Resources"}
      </Title>
      <Masonry columnsCount={3} className="px-40">
        {showingResources.length > 0 &&
          showingResources.map((resource, index) => {
            if (resource.type === "image") {
              return (
                <DefaultResource
                  key={index}
                  image={resource.url}
                  title={resource.title}
                  onClick={() => handleResourceClick("resource", resource)}
                />
              );
            } else if (resource.type === "audio") {
              return (
                <AudioResource
                  key={index}
                  onClick={() => handleResourceClick("resource", resource)}
                  textContent={resource.content}
                />
              );
            } else if (resource.type === "pdf" || resource.type === "youtube") {
              const imageUrl = `data:image/png;base64, ${resource.page_image}`;
              return (
                <DefaultResource
                  key={index}
                  image={imageUrl}
                  title={resource.title}
                  onClick={() => handleResourceClick("resource", resource)}
                />
              );
            }
            return null; // handle other resource types if needed
          })}
      </Masonry>
      <Modal opened={opened} onClose={close} centered size="55%">
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Home;
