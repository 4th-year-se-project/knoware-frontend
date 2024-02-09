import { Select, Flex, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { getAllCoursess } from "../services/resourceAPI";

const Filter = ({ handleCallback }: any) => {
  const [courseList, setCourseList] = useState([]);
  const [fileFormat, setFileFormat] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [course, setCourse] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);

  const handleSearch = () => {
    if (handleCallback) {
      handleCallback(fileFormat, date, course, label);
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
        justify="center"
        align="flex-start"
        direction="row"
        mb={10}
      >
        {" "}
        <Select
          label="File format"
          placeholder=""
          data={["pdf", "doc", "ppt", "mp3", "youtube", "audio"]}
          value={fileFormat}
          searchable
          nothingFound="Nothin found..."
          onChange={(value) => setFileFormat(value)}
        />
        <Select
          label="Relative time"
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
        <Select
          label="Label"
          placeholder=""
          data={["Favourite", "Not important", ""]}
          searchable
          value={label}
          onChange={(value) => setLabel(value)}
        />{" "}
        <Button
          variant="filled"
          className="mt-auto"
          onClick={handleSearch}
          style={{
            zIndex: 1,
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
          }}
        >
          Apply filters{" "}
        </Button>
      </Flex>
    </>
  );
};

export default Filter;
