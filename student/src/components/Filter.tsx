import { Select, Flex, Button } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { getAllTopics } from "../services/resourceAPI";
import { useDispatch } from "react-redux";

// const topics = Array(100_000)
//   .fill(0)
//   .map((_, index) => `Option ${index}`);

const Filter = ({handleCallback}: any) => {

  const [topicList, setTopicList] = useState([]);
  const [fileFormat, setFileFormat] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);

  const handleSearch = () => {
    if(handleCallback){
      handleCallback(fileFormat, date, topic, label)
    }
    console.log(date);
  };

  const getTopics = async () => {
    const response = await getAllTopics();
    setTopicList(response.data.topics);
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
          data={[
            "pdf",
            "doc",
            "ppt",
            "mp3",
            "youtube",
            "audio",
          ]}
          value={fileFormat}
          searchable
          nothingFound="Nothin found..."
          onChange={(value) => setFileFormat(value)}
        />
        <Select
          label="Date"
          placeholder=""
          value={date}
          data={["1 day", "2 days", "1 week", "1 month"]}
          onChange={(value) => setDate(value)}
        />
        <Select
          label="Topic"
          placeholder=""
          data={topicList}
          searchable
          value={topic}
          onChange={(value) => setTopic(value)}
        />
        <Select
          label="Label"
          placeholder=""
          data={["Favourite", "Not important", ""]}
          searchable
          value={label}
          onChange={(value) => setLabel(value)}
        />{" "}
        <Button variant="filled" className="mt-auto" onClick={handleSearch}>
          Search
        </Button>
      </Flex>
    </>
  );
};

export default Filter;
