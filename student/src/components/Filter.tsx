import { Select, Flex, Button, MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react";
import { getAllCoursess } from "../services/resourceAPI";

const Filter = ({ handleCallback, getResourcesCallback }: any) => {
  const [courseList, setCourseList] = useState([]);
  const [fileFormat, setFileFormat] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [course, setCourse] = useState<string | null>(null);
  const [label, setLabel] = useState<string[]>([]);

  const handleSearch = () => {
    if (handleCallback) {
      handleCallback(fileFormat, date, course, label);
    }
  };

  const handleResetFilter = () => {
    setFileFormat("");
    setDate("");
    setCourse("");
    setLabel([]);

    if (getResourcesCallback) {
      getResourcesCallback();
    }
  };

  const getTopics = async () => {
    const response = await getAllCoursess();
    setCourseList(response.data.topics);
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <>
      <Flex
        mih={50}
        gap="md"
        justify="between"
        align="flex-start"
        direction="row"
        mb={10}
      >
        {" "}
        <Select
          label="Resource type"
          placeholder=""
          data={["pdf", "doc", "ppt", "mp3", "youtube", "audio"]}
          value={fileFormat}
          searchable
          nothingFound="Nothin found..."
          onChange={(value) => setFileFormat(value)}
        />
        <Select
          label="Modified"
          placeholder=""
          value={date}
          data={["1 day ago", "2 days ago", "1 week ago", "1 month ago"]}
          onChange={(value) => setDate(value)}
        />
        <Select
          label="Course"
          placeholder=""
          data={courseList}
          searchable
          value={course}
          onChange={(value) => setCourse(value)}
        />
        <MultiSelect
          label="Label"
          placeholder=""
          clearable
          data={["High priority", "Medium priority", "Low priority", "Completed", "In progress"]}
          value={label}
          onChange={(value) => setLabel(value)}
        />
        <Button
          onClick={handleSearch}
          variant="filled"
          className="mt-auto"
          style={{
            zIndex: 1,
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
          }}
        >
          Apply
        </Button>
        <Button
          onClick={handleResetFilter}
          variant="link"
          className="mt-auto"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#FF0000",
            border: "2px solid #FF0000",
          }}
        >
          Reset
        </Button>
      </Flex>
    </>
  );
};

export default Filter;
