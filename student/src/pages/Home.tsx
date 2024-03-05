import { SearchBar } from "../components";
import HeaderBar from "../components/HeaderBar";
import Masonry from "react-responsive-masonry";
import AudioResource from "../components/AudioResource";
import DefaultResource from "../components/DefaultResource";
import { Box, Loader } from "@mantine/core";
import {
  IconFileText,
  IconCircleCheckFilled,
  IconMoodWrrr,
  IconExclamationCircle,
  IconChevronDown,
  IconChevronUp,
  IconX,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addFileStatus,
  clearFileStatus,
  FileStatus,
} from "../slices/fileStatusSlice";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Title, rem, Group, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import ResourceModal from "../components/ResourceModal";
import { IconPhoto } from "@tabler/icons-react";
import UploadModal from "../components/UploadModal";
import Filter from "../components/Filter";
import {
  getAllResources,
  getRecommendedResources,
} from "../services/resourceAPI";
import { search, getSearchRecommendation } from "../services/searchAPI";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  // const [filtersOpened, { open: openFilters, close: closeFilters }] = useDisclosure(false);
  const [filtersOpened, { toggle: toggleFilters }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState("null");
  const [resources, setResources] = useState<any[]>([]);
  const [allResources, setAllResources] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendedResources, setRecommendedResources] = useState<any[]>([]);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [activeResource, setActiveResource] = useState<any>({
    name: "",
    image: "",
    topic: "",
    course: "",
    content: "",
    label: "",
    id: "",
    isRecommended: "",
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const fileStatusList: FileStatus[] = useSelector(
    (state: RootState) => state.fileStatus.fileStatusList
  );
  const [isUploadBoxOpened, setIsUploadBoxOpened] = useState<Boolean>(false);
  const [isCloseButtonEnabled, setIsCloseButtonEnabled] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const username = urlParams.get("name");

    if (token && username) {
      localStorage.setItem("access_token", token);
      localStorage.setItem("name", username);

      navigate("/");
      getResources();
    } else if (
      localStorage.getItem("access_token") &&
      localStorage.getItem("name")
    ) {
      getResources();
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (fileStatusList.length > 0) {
      setIsUploadBoxOpened(true);
    }
    const allFinished =
      fileStatusList.every(
        (fileStatus) =>
          fileStatus.status === "cancelled" ||
          fileStatus.status === "error" ||
          fileStatus.status === "success"
      ) && fileStatusList.length > 0;
    getResources();
    setIsCloseButtonEnabled(allFinished);
  }, [fileStatusList]);

  const [fileFormat, setFileFormat] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [course, setCourse] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    console.log("Search query:", query);
    setSearchQuery(query);
    const searchResults = await search({
      query: query,
      file_format: fileFormat,
      date: date,
      course: course,
      label: label,
    });
    setResources(searchResults.data.results);
    setAllResources(searchResults.data.results);

    const searchRecommendedResults = query
      ? await getSearchRecommendation({
          query: query,
          file_format: fileFormat,
          date: date,
          course: course,
          label: label,
        })
      : "";

    searchRecommendedResults
      ? setRecommendedResources(searchRecommendedResults.data.results)
      : setRecommendedResources([]);
  }, []);

  const getResources = async () => {
    const res = await getAllResources();
    setResources(res.data.results);
    setAllResources(res.data.results);
  };

  useEffect(() => {
    async function getDefaultRecommendation() {
      try {
        const ids = resources.map((item: { doc_id: any }) => item.doc_id);
        const res = await getRecommendedResources({ document_ids: ids });
        setRecommendedResources(res.data.results);
      } catch (error) {
        console.error("Error fetching default recommendation:", error);
      }
    }
    getDefaultRecommendation();
  }, [resources]);

  const handleResourceClick = (resourceType: string, resource: any) => {
    setActiveResource({
      name: resource.title,
      topic: resource.topic,
      course: resource.course,
      image: resource.url || `data:image/png;base64, ${resource.page_image}`,
      content: resource.content,
      doc_id: resource.doc_id,
      embedding_id: resource.embedding_id,
      keywords: resource.keywords,
      label: resource.label,
      id: resource.doc_id,
      type: resource.type,
      link: resource.link,
      isRecommended: resource.isRecommended,
    });
    setModalContent(resourceType);
    open();
  };

  const closeModal = () => {
    close();
  };

  const handleFilter = async (
    fileFormat: any,
    date: any,
    course: any,
    label: any
  ) => {
    setFileFormat(fileFormat);
    setDate(date);
    setCourse(course);
    setLabel(label);

    const searchResults = await search({
      query: searchQuery,
      file_format: fileFormat,
      date: date,
      course: course,
      label: label,
    });
    setAllResources(searchResults.data.results);
  };

  const handleFiltersToggle = () => {
    toggleFilters();
  };

  const handleRecommendButtonClick = () => {
    if (showRecommendation) {
      setShowRecommendation(false);
      setAllResources(resources);
    } else {
      setShowRecommendation(true);
      setAllResources(recommendedResources.concat(resources));
    }
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
          doc_id={activeResource.doc_id}
          embedding_id={activeResource.embedding_id}
          keywords={activeResource.keywords}
          label={activeResource.label}
          id={activeResource.id}
          type={activeResource.type}
          link={activeResource.link}
          onClose={closeModal}
          isRecommended={activeResource.isRecommended}
        />
      );
    }
    // Default case, no specific content to render
    return null;
  };

  const handleCancelUpload = (index: number) => {
    const fileStatus = fileStatusList[index];
    if (fileStatus && fileStatus.abortController) {
      fileStatus.abortController.abort();
      // Optionally, you can update the status in the store
      // dispatch(
      //   updateFileStatus({ fileInfo: fileStatus.fileInfo, status: "cancelled" })
      // );
      dispatch(
        addFileStatus({ fileInfo: fileStatus.fileInfo, status: "cancelled" })
      );
    }
  };

  const handleCloseBox = () => {
    // Implement closing logic and clearing the file status list
    setIsUploadBoxOpened(false);
    dispatch(clearFileStatus()); // Assuming you have a clearFileStatus action
  };

  const handleToggleCollapse = () => {
    // Toggle the collapse state
    setIsUploadBoxOpened(!isUploadBoxOpened);
  };

  return (
    <div>
      <HeaderBar onLogoClick={() => null} />
      <div className="flex items-center justify-between px-40">
        <div className="flex items-center">
          <SearchBar long={true} onSearch={handleSearch} />
          <Button
            onClick={handleFiltersToggle}
            variant="link"
            className="mt-auto ml-10"
            style={{
              backgroundColor: "#007BFF",
              color: "#FFFFFF",
            }}
          >
            {filtersOpened ? "Hide Filters" : "Filters"}
          </Button>
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
      {filtersOpened && (
        <div className="px-40 mb-4">
          <Filter
            handleCallback={handleFilter}
            getResourcesCallback={getResources}
          />
        </div>
      )}
      <div className="flex justify-between mr-40 mt-10 mb-6">
        <Title order={1} className="px-40">
          {searchQuery ? `Results for "${searchQuery}"` : "Your Resources"}
        </Title>
        <Tooltip label="Click here to discover resources recommended from your peers">
          <Button
            onClick={handleRecommendButtonClick}
            variant="filled"
            className="mt-auto"
            style={{
              zIndex: 1,
              backgroundColor: "#007BFF",
              color: "#FFFFFF",
            }}
          >
            {showRecommendation
              ? "Hide Recommendations"
              : "Show Recommendation"}
          </Button>
        </Tooltip>
      </div>
      {allResources.length > 0 ? (
        <Masonry className="px-40" columnsCount={3}>
          {allResources.map((resource, index) => {
            if (resource.type === "image") {
              return (
                <DefaultResource
                  key={index}
                  image={resource.url}
                  title={resource.title}
                  onClick={() => handleResourceClick("resource", resource)}
                  isRecommended={resource.isRecommended}
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
                  isRecommended={resource.isRecommended}
                />
              );
            }
            return null; // handle other resource types if needed
          })}
        </Masonry>
      ) : (
        <div className="text-center mx-auto w-1/3 my-auto">
          <img src="no-results.jpg" alt="No results found" />
          <p className="text-lg">No results found</p>
        </div>
      )}

      {fileStatusList.length > 0 && (
        <Box
          className={`fixed bottom-0 right-4 h-auto min-h-1/12 w-1/4 text-black bg-white border-gray-200 border-2 shadow-gray-200 rounded-t-lg shadow-md ${
            isUploadBoxOpened ? "pb-3" : ""
          }`}
        >
          <div
            id="upload-box-header"
            className="bg-slate-200 w-full h-3/12 p-2 flex justify-between items-center"
          >
            <p className="ml-3">Uploading resources</p>
            <Group className="flex justify-left align-left p-2">
              <button
                onClick={handleToggleCollapse}
                className="text-gray-500 hover:text-blue-700"
              >
                {isUploadBoxOpened ? <IconChevronDown /> : <IconChevronUp />}
              </button>

              <button
                onClick={handleCloseBox}
                disabled={!isCloseButtonEnabled} // Set this based on file status list
              >
                <IconX width={17} height={17} />
              </button>
            </Group>
          </div>
          <div
            className={`h-9/12 overflow-y-scroll ${
              isUploadBoxOpened ? "" : "hidden"
            }`}
          >
            {fileStatusList.map((fileStatus, index) => (
              <div
                key={index}
                className="px-4 pt-4 flex items-center justify-between"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center">
                  <IconFileText></IconFileText>
                  <p className="text-ellipsis overflow-hidden w-4/5 text-sm ml-3 whitespace-normal">
                    <span>
                      {fileStatus.fileInfo
                        ? fileStatus.fileInfo.name
                        : "Unknown file"}
                    </span>
                  </p>
                </div>

                <div>
                  {/* {fileStatus.status === "uploading" ? (
                    <>
                      {hoveredIndex === index ? (
                        // Display the cancel button and attach the cancelUpload function
                        <IconCircleXFilled
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleCancelUpload(index)}
                        />
                      ) : (
                        // Display the loading icon
                        <Loader
                          color="blue"
                          size="sm"
                          className="cursor-pointer"
                        />
                      )}
                    </>
                  ) : fileStatus.status === "success" ? (
                    <IconCircleCheckFilled className="text-green-500 cursor-pointer" />
                  ) : fileStatus.status === "cancelled" ? (
                    <IconMoodWrrr className="text-yellow-500 cursor-pointer" />
                  ) : (
                    <IconExclamationCircle className="text-red-500 cursor-pointer" />
                  )} */}
                  {fileStatus.status === "uploading" ? (
                    <Loader color="blue" size="sm" className="cursor-pointer" />
                  ) : fileStatus.status === "success" ? (
                    <IconCircleCheckFilled className="text-green-500 cursor-pointer" />
                  ) : fileStatus.status === "cancelled" ? (
                    <IconMoodWrrr className="text-yellow-500 cursor-pointer" />
                  ) : (
                    <IconExclamationCircle className="text-red-500 cursor-pointer" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Box>
      )}

      <Modal opened={opened} onClose={close} centered size="55%">
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Home;
