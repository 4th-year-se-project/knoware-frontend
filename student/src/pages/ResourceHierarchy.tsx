import React, { useCallback, useEffect, useState } from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import {
  AppShell,
  Navbar,
  Accordion,
  Group,
  ScrollArea,
  List,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import { getCourseDetails } from "../services/resourceAPI";

type Props = {};

const ResourceHierarchy = (props: Props) => {
  const [courseData, setCourseData] = useState<any>({
    topics: [], // Provide an initial empty array or an appropriate initial structure
  });
  const [zoomedId, setZoomedId] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>({}); // [1
  const navigate = useNavigate();
  const handleLogoClick = useCallback(() => {
    console.log("Logo clicked");
    navigate("/");
  }, [navigate]);

  const randomColorSet = Array.from({ length: 50 }, () => {
    const r = Math.floor(Math.random() * 256); // Random red component (0-255)
    const g = Math.floor(Math.random() * 256); // Random green component (0-255)
    const b = Math.floor(Math.random() * 256); // Random blue component (0-255)
    return `rgb(${r},${g},${b})`;
  });

  const getCourseData = async () => {
    setCourseData({});
    try {
      // Get the docID from session storage
      const docID = sessionStorage.getItem("docID");

      // Check if docID is null or undefined
      if (docID !== null && docID !== undefined) {
        const response = await getCourseDetails(parseInt(docID, 10));
        const data = await response.data;
        console.log(data);
        setCourseData(data);
        setChartData({
          name: "root",
          children: courseData.topics.map((topic: any) => ({
            name: topic.topic_name,
            children: topic.subtopics.map(
              (subtopic: any, subtopicIndex: number) => ({
                name: subtopic.subtopic_name,
                children: subtopic.documents.map((document: any) => ({
                  name: document.document_name,
                  value: document.similarity_score,
                  color: randomColorSet[subtopicIndex], // Assign colors based on the index
                })),
              })
            ),
          })),
        });
      } else {
        console.error("docID is null or undefined");
      }
    } catch (error) {
      console.error("Error getting course data:", error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []); // Empty dependency array means this effect runs once on mount

  // Define the onClick handler
  const handleLeafClick = (node: any) => {
    if (!node.children) {
      console.log(`Clicked on leaf node: ${node.data.name}`);
    }
  };

  return (
    <AppShell
      padding="md"
      header={<HeaderBar onLogoClick={handleLogoClick} />}
      navbar={
        <Navbar width={{ base: 300 }} height="full" p="md">
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            {courseData.topics && courseData.topics.length > 0 ? ( // Check if courseData is available
              <Accordion variant="contained">
                {courseData.topics.map((topic: any, index: number) => (
                  <Accordion.Item key={index} value={topic.topic_name}>
                    <Accordion.Control className="text-sm">
                      {topic.topic_name}
                    </Accordion.Control>
                    <Accordion.Panel>
                      {topic.subtopics.map((subtopic: any, index: number) => (
                        <Accordion variant="separated">
                          <Accordion.Item
                            key={index}
                            value={subtopic.subtopic_name}
                          >
                            <Accordion.Control className="text-sm">
                              {subtopic.subtopic_name}
                            </Accordion.Control>
                            <Accordion.Panel>
                              <List>
                                {subtopic.documents.map(
                                  (document: any, index: number) => (
                                    <List.Item
                                      key={index}
                                      className="text-xs text-blue-700 cursor-pointer"
                                      onClick={() => {}}
                                    >
                                      {document.document_name}
                                    </List.Item>
                                  )
                                )}
                              </List>
                            </Accordion.Panel>
                          </Accordion.Item>
                        </Accordion>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <div>Loading...</div>
            )}
          </Navbar.Section>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <ResponsiveCirclePacking
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="value"
        colors={(node: any) => node.data.color} // Use the color property from the data
        childColor={{ from: "color", modifiers: [["darker", 0.3]] }}
        leavesOnly
        enableLabels
        // onClick={handleLeafClick} // Attach the onClick handler to the chart
        zoomedId={zoomedId}
        motionConfig="slow"
        onClick={(node) => {
          setZoomedId(zoomedId === node.id ? null : node.id);
          console.log(node);
        }}
      />
    </AppShell>
  );
};

export default ResourceHierarchy;
