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
  const navigate = useNavigate();
  const handleLogoClick = useCallback(() => {
    console.log("Logo clicked");
    navigate("/");
  }, [navigate]);

  const getCourseData = async () => {
    setCourseData({});
    try {
      const response = await getCourseDetails(1);
      const data = await response.data;
      console.log(data);
      setCourseData(data);
    } catch (error) {
      console.error("Error getting course data:", error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []); // Empty dependency array means this effect runs once on mount

  const data = {
    name: "root",
    children: [
      { name: "Resource.pdf", value: 10 },
      { name: "Resource2.ppt", value: 20 },
      {
        name: "HCI Evaluation",
        children: [
          { name: "Resource3.mp3", value: 5 },
          { name: "Resource4.mp4", value: 8 },
        ],
      },
    ],
  };

  // Define a custom color scheme based on the 'color' property in your data
  const customColorScheme = () => {
    // Generate random values for red and green channels
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);

    // Set the blue channel to 0
    const randomBlue = 0;

    // Create a CSS color string in the format "rgb(r, g, b)"
    const color = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;

    return color;
  };

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
              // You can show a loading indicator here if needed
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
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="value"
        colors={customColorScheme}
        childColor={{ from: "color", modifiers: [["darker", 0.3]] }}
        leavesOnly
        enableLabels
        onClick={handleLeafClick} // Attach the onClick handler to the chart
      />
    </AppShell>
  );
};

export default ResourceHierarchy;
