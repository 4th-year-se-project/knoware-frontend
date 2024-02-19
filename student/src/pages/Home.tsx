import { SearchBar } from "../components";
import HeaderBar from "../components/HeaderBar";
import Masonry from "react-responsive-masonry";
import AudioResource from "../components/AudioResource";
import DefaultResource from "../components/DefaultResource";
import { Modal, Button, Title, rem, Group, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import ResourceModal from "../components/ResourceModal";
import { IconPhoto } from "@tabler/icons-react";
import UploadModal from "../components/UploadModal";
import {
  getAllResources,
  getRecommendedResources,
} from "../services/resourceAPI";
import { search, getSearchRecommendation } from "../services/searchAPI";
import RecommendedResource from "../components/RecommendedResource";

const Home = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState("null");
  const [resources, setResources] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRecommendation, setSearchRecommendation] = useState<any[]>([]);
  const [defaultRecommendation, setDefaultRecommendation] = useState<any[]>([]);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [activeResource, setActiveResource] = useState<any>({
    name: "",
    image: "",
    topic: "",
    course: "",
    content: "",
  });

  const handleSearch = useCallback(async (query: string) => {
    console.log("Search query:", query);
    setSearchQuery(query);
    const searchResults = await search({ query: query });
    setResources(searchResults.data.results);
    const searchRecommendedResults = query
      ? await getSearchRecommendation({
          query: query,
        })
      : "";
    searchRecommendedResults
      ? setSearchRecommendation(searchRecommendedResults.data.results)
      : setSearchRecommendation([]);
  }, []);

  const getResources = async () => {
    const res = await getAllResources();
    setResources(res.data.results);
  };

  useEffect(() => {
    async function getDefaultRecommendation() {
      try {
        const ids = resources.map((item: { doc_id: any }) => item.doc_id);
        const res = await getRecommendedResources({ document_ids: ids });
        setDefaultRecommendation(res.data.results);
      } catch (error) {
        console.error("Error fetching default recommendation:", error);
      }
    }
    getDefaultRecommendation();
  }, [resources]);

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

  const handleRecommendButtonClick = () => {
    setShowRecommendation(true);
  };

  const handleRegularButtonClick = () => {
    setShowRecommendation(false);
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
      <div className="flex justify-between mr-40 mt-10">
        <Title order={1} className="px-40">
          {searchQuery ? `Results for "${searchQuery}"` : "Your Resources"}
        </Title>
        <Tooltip label="Click here to discover resources recommended from your peers">
          <Button
            onClick={
              showRecommendation
                ? handleRegularButtonClick
                : handleRecommendButtonClick
            }
            variant="filled"
            className="mt-auto"
            style={{
              zIndex: 1,
              backgroundColor: "#A855F7",
              color: "#FFFFFF",
            }}
          >
            {showRecommendation
              ? "Hide Recommendations"
              : "Show Recommendation"}
          </Button>
        </Tooltip>
      </div>
      <Masonry columnsCount={3} className="px-40">
        {showRecommendation && searchQuery === ""
          ? defaultRecommendation?.map((recommendedResource, index) => {
              if (recommendedResource.type === "audio") {
                return (
                  <AudioResource
                    key={index}
                    onClick={() =>
                      handleResourceClick("resource", recommendedResource)
                    }
                    textContent={recommendedResource.content}
                  />
                );
              } else if (
                recommendedResource.type === "pdf" ||
                recommendedResource.type === "youtube"
              ) {
                const imageUrl = `data:image/png;base64, ${recommendedResource.page_image}`;
                return (
                  <RecommendedResource
                    key={index}
                    image={imageUrl}
                    title={recommendedResource.title}
                    onClick={() =>
                      handleResourceClick("resource", recommendedResource)
                    }
                  />
                );
              }
              return null;
            })
          : ""}
        {showRecommendation && searchRecommendation !== null
          ? searchRecommendation.map((recommendedResource, index) => {
              if (recommendedResource.type === "image") {
                return (
                  <RecommendedResource
                    key={index}
                    image={recommendedResource.url}
                    title={recommendedResource.title}
                    onClick={() =>
                      handleResourceClick("resource", recommendedResource)
                    }
                  />
                );
              } else if (recommendedResource.type === "audio") {
                return (
                  <AudioResource
                    key={index}
                    onClick={() =>
                      handleResourceClick("resource", recommendedResource)
                    }
                    textContent={recommendedResource.content}
                  />
                );
              } else if (
                recommendedResource.type === "pdf" ||
                recommendedResource.type === "youtube"
              ) {
                const imageUrl = `data:image/png;base64, ${recommendedResource.page_image}`;
                return (
                  <RecommendedResource
                    key={index}
                    image={imageUrl}
                    title={recommendedResource.title}
                    onClick={() =>
                      handleResourceClick("resource", recommendedResource)
                    }
                  />
                );
              }
              return null;
            })
          : ""}
        {resources.length > 0 &&
          resources.map((resource, index) => {
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
