import React, { useState, useEffect } from "react";
import { Table, Tabs, Rating, Textarea } from "@mantine/core";
import Logo from "../assets/images/logo.svg";
import { getDashboard, editRating, addComment } from "../services/dashboardAPI";
import { IconExternalLink } from "@tabler/icons-react";
import { getPdf } from "../services/resourceAPI";

const LecturerDashboard = () => {
  const [resources, setResources] = useState([]);

  const [activeTab, setActiveTab] = useState<string | null>("0");
  const [rows, setRows] = useState();

  useEffect(() => {
    getLecturerDashboard();
    handleTabChange(activeTab);
  }, []);

  useEffect(() => {
    handleTabChange(activeTab);
  }, [resources]);

  const getLecturerDashboard = async () => {
    try {
      const response = await getDashboard();
      setResources(response.data);
    } catch (error) {
      console.error("Error getting resource info:", error);
    }
  };

  const openPdfInNewWindow = async (doc_id: any) => {
    try {
      // Fetch the PDF using the getPdf function
      const response = await getPdf(doc_id);

      // Create a blob URL for the PDF content
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new window
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error fetching or opening PDF:", error);
    }
  };
  const openResource = (link: any, title: any, id: any) => {
    if (link) {
      window.open(link, "_blank");
    } else if (
      title?.endsWith(".pdf") ||
      title?.endsWith(".ppt") ||
      title?.endsWith(".pptx") ||
      title?.endsWith(".doc") ||
      title?.endsWith(".docx")
    ) {
      openPdfInNewWindow(id);
    }
  };
  const generateRows = (index: number) => {
    const selectedCourse: any = resources?.[index];
    if (selectedCourse) {
      return selectedCourse.resources.map((resource: any) => (
        <tr key={resource.id}>
          <td
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {resource.title}
          </td>
          <td
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {resource.topic}
          </td>
          <td>{resource.popularity}</td>
          <td>
            <Rating
              value={resource.rating}
              onChange={(value) => handleRating(resource.id, value)}
            />
          </td>
          <td>
            <Textarea
              placeholder="Add comment..."
              autosize
              maxRows={2}
              defaultValue={resource.comment}
              onBlur={(event) =>
                handleComment(resource.id, event.currentTarget.value)
              }
            />
          </td>
          <td>
            <IconExternalLink
              onClick={() =>
                openResource(resource.link, resource.title, resource.id)
              }
              color="#4263eb"
              className="cursor-pointer"
            />
          </td>
        </tr>
      ));
    }
    return [];
  };

  const handleTabChange = (value: any) => {
    setActiveTab(value);
    const newRows = generateRows(parseInt(value));
    setRows(newRows);
  };

  const handleRating = async (document_id: any, rating: any) => {
    await editRating(document_id, rating);
    getLecturerDashboard();
  };

  const handleComment = async (document_id: any, value: any) => {
    await addComment(document_id, value);
    getLecturerDashboard();
  };

  return (
    <div style={{ padding: "20px", margin: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src={Logo} alt="logo" width={100} className="cursor-pointer" />
      </div>
      <Tabs value={activeTab} onTabChange={handleTabChange}>
        <Tabs.List>
          {resources?.map((item: any, index) => (
            <Tabs.Tab key={item.id} value={index.toString()}>
              {item.course}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Table style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Topic</th>
              <th>Popularity</th>
              <th>Rating</th>
              <th>Comments</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Tabs>
    </div>
  );
};

export default LecturerDashboard;
