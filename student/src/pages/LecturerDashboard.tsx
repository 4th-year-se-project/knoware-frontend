// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Tabs,
//   Rating,
//   Textarea,
//   Button,
//   Container,
//   Paper,
//   Modal
// } from "@mantine/core";
// import Logo from "../assets/images/logo.svg";
// import {
//   getDashboard,
//   editRating,
//   addComment,
//   getCourses,
// } from "../services/dashboardAPI";
// import { IconExternalLink } from "@tabler/icons-react";
// import { getPdf } from "../services/resourceAPI";

// const LecturerDashboard = () => {
//   const [resources, setResources] = useState([]);

//   const [activeTab, setActiveTab] = useState<string | null>("0");
//   const [rows, setRows] = useState();
//   const [courses, getCourses] = useState([]);

//   useEffect(() => {
//     getLecturerDashboard();
//     handleTabChange(activeTab);
//   }, []);

//   useEffect(() => {
//     handleTabChange(activeTab);
//   }, [resources]);

import React, { useState, useEffect } from "react";
import {
  Table,
  Tabs,
  Rating,
  Textarea,
  Button,
  Container,
  Paper,
  Modal,
  Title,
  Text,
} from "@mantine/core";
import Logo from "../assets/images/logo.svg";
import {
  getDashboard,
  editRating,
  addComment,
  getCourses,
} from "../services/dashboardAPI";
import { IconExternalLink } from "@tabler/icons-react";
import { getPdf } from "../services/resourceAPI";
import CourseForm from "../components/CourseForm"; // Import your CourseForm component

const LecturerDashboard = () => {
  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState<string | null>("0");
  const [rows, setRows] = useState();
  const [courses, setCourses] = useState([]);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false); // State for showing/hiding Add Course modal
  const [showCoursesModal, setShowCoursesModal] = useState(false); // State for showing/hiding Add Course modal

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

  // const getCoursesList = async () => {
  //   try {
  //     const response = await getCourses();
  //     setCourses(response.data);
  //   } catch (error) {
  //     console.error("Error getting courses:", error);
  //   }
  // };

  const getCoursesList = async () => {
    try {
      const response = await getCourses();
      console.log("Courses response:", response.data); // Add this line to log the response
      setCourses(response.data);
    } catch (error) {
      console.error("Error getting courses:", error);
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
              size="xs"
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
      <div
        style={{ textAlign: "center", marginBottom: "20px" }}
        className="flex place-items-center justify-between"
      >
        <img src={Logo} alt="logo" width={100} className="cursor-pointer" />
        <div className="flex">
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              setShowAddCourseModal(false);
              setShowCoursesModal(true);
              getCoursesList(); // Fetch existing courses when "View Your Courses" is clicked
            }} // Show existing courses
          >
            View Your Courses
          </Button>
          <Button
            className="ml-6 bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              setShowCoursesModal(false);
              setShowAddCourseModal(true);
            }} // Show Add Course form
          >
            Add New Course
          </Button>
        </div>
      </div>
      <Tabs value={activeTab} onTabChange={handleTabChange}>
        <Tabs.List>
          {resources?.map((item: any, index) => (
            <Tabs.Tab key={item.id} value={index.toString()}>
              {item.course}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Table style={{ marginTop: "30px" }} fontSize="xs">
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

      <Modal
        opened={showAddCourseModal || showCoursesModal}
        onClose={() => {
          setShowAddCourseModal(false);
          setShowCoursesModal(false);
        }}
        size="70%"
      >
        {showAddCourseModal ? (
          <CourseForm />
        ) : (
          <Container>
            {courses.map((course: any) => (
              <Paper
                key={course.id}
                radius="md"
                shadow="sm"
                className="mb-5 p-5"
              >
                <Title order={4}>
                  {course.courseName} | {course.courseCode}
                </Title>
                {course.topics.map((topic: any, topicIndex: number) => (
                  <Paper key={topicIndex} radius="md" className="pl-5 m-3">
                    <Text>{topic}</Text>
                  </Paper>
                ))}
              </Paper>
            ))}
          </Container>
        )}
      </Modal>
    </div>
  );
};

export default LecturerDashboard;
