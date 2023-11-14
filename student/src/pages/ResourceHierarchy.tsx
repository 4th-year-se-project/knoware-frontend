import React, { useCallback, useEffect, useState } from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { AppShell, Navbar, Accordion, ScrollArea, List } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import { getCourseDetails } from "../services/resourceAPI";
import { ResourceBar } from "../components";

type Props = {};

const ResourceHierarchy = (props: Props) => {
  const [courseData, setCourseData] = useState<any>({
    topics: [], // Provide an initial empty array or an appropriate initial structure
  });
  const [zoomedId, setZoomedId] = useState<string | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<any>(sessionStorage.getItem("docID"));
  const [chartData, setChartData] = useState<any>({});
  const [docID, setDocID] = useState<any>(sessionStorage.getItem("docID"))
  const navigate = useNavigate();
  const handleLogoClick = useCallback(() => {
    console.log("Logo clicked");
    navigate("/home");
  }, [navigate]);

  const randomColorSet = Array.from({ length: 200 }, () => {
    const r = Math.floor(Math.random() * 256); // Random red component (0-255)
    const g = Math.floor(Math.random() * 256); // Random green component (0-255)
    const b = Math.floor(Math.random() * 256); // Random blue component (0-255)
    return `rgb(${r},${g},${b})`;
  });

  const getCourseData = async () => {
    setCourseData({});
    try {
      // Check if docID is null or undefined
      if (docID !== null && docID !== undefined) {
        const response = await getCourseDetails(parseInt(docID, 10));
        const data = await response.data;
        console.log(data)
        setCourseData(data);
        const newChartData = {
          name: "root",
          children: data.topics.map((topic: any, topicIndex: number) => ({
            name: topic.topic_name,

            children: topic.documents.map((document: any) => ({
              doc_id: document.document_id,
              name: document.document_name,
              value: document.similarity_score,
              color:
                randomColorSet[topicIndex * data.topics.length + topicIndex], // Assign colors based on the topic and subtopic index
            })),
          })),
        };
        setChartData(newChartData);
      } else {
        console.error("docID is null or undefined");
      }
    } catch (error) {
      console.error("Error getting course data:", error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, [docID]); // Empty dependency array means this effect runs once on mount

  // Define the onClick handler
  const handleLeafClick = (node: any) => {
    if (!node.children) {
      console.log(`Clicked on leaf node: ${node.data.name}`);
    }
  };

  const handleDocumentClick = (selectedDoc: number) => {
    console.log(selectedDoc)
    sessionStorage.setItem('docID', String(selectedDoc));
    setDocID(selectedDoc)
    setSelectedDocId(selectedDoc);
  };

  return (
    <>
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
                        <List>
                          {topic.documents.map(
                            (document: any) => (
                              <List.Item
                                key={document.id}
                                className="text-xs text-blue-700 cursor-pointer ml-1"
                                onClick={() => handleDocumentClick(document.document_id)}
                              >
                                {document.document_name}
                              </List.Item>
                            )
                          )}
                        </List>
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
        aside={
          <ResourceBar
            docID={selectedDocId}
            topics={
              courseData && courseData.topics
                ? courseData.topics.map((topic: any) => topic.topic_name)
                : []
            }
          />
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
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 0,
          }}
          id="name"
          value="value"
          colors={(node: any) => node.data.color} // Use the color property from the data
          childColor={{ from: "color", modifiers: [["darker", 0.3]] }}
          leavesOnly
          enableLabels
          //onClick={handleLeafClick} // Attach the onClick handler to the chart
          zoomedId={zoomedId}
          motionConfig="slow"
          onClick={(node) => {
            console.log(node.data.doc_id);
            setZoomedId(zoomedId === node.id ? null : node.id);
            setSelectedDocId(node.data.doc_id);
          }}
        />
      </AppShell>
    </>
  );
};

export default ResourceHierarchy;
