import React, { useState } from "react";
import {
  Container,
  Grid,
  Col,
  InputBase,
  Button,
  Paper,
  Title,
} from "@mantine/core";
import { IconSquarePlus, IconTrash } from "@tabler/icons-react";
import { addCourseDetails } from "../services/dashboardAPI";

interface Subtopic {
  subtopicName: string;
}

interface Topic {
  topicName: string;
  subtopics: Subtopic[];
}

interface Course {
  courseName: string;
  courseCode: string;
  topics: Topic[];
}

const CourseForm: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      courseName: "",
      courseCode: "",
      topics: [{ topicName: "", subtopics: [{ subtopicName: "" }] }],
    },
  ]);

  const handleCourseChange = (
    index: number,
    key: keyof Course,
    value: string
  ) => {
    const updatedCourses = [...courses];
    (updatedCourses[index] as any)[key] = value;
    setCourses(updatedCourses);
  };

  const handleTopicChange = (
    courseIndex: number,
    topicIndex: number,
    value: string
  ) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].topics[topicIndex].topicName = value;
    setCourses(updatedCourses);
  };

  const handleSubtopicChange = (
    courseIndex: number,
    topicIndex: number,
    subtopicIndex: number,
    value: string
  ) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].topics[topicIndex].subtopics[
      subtopicIndex
    ].subtopicName = value;
    setCourses(updatedCourses);
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        courseName: "",
        courseCode: "",
        topics: [{ topicName: "", subtopics: [{ subtopicName: "" }] }],
      },
    ]);
  };

  const addTopic = (courseIndex: number) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].topics.push({
      topicName: "",
      subtopics: [{ subtopicName: "" }],
    });
    setCourses(updatedCourses);
  };

  const addSubtopic = (courseIndex: number, topicIndex: number) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].topics[topicIndex].subtopics.push({
      subtopicName: "",
    });
    setCourses(updatedCourses);
  };

  const deleteCourse = (courseIndex: number) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(courseIndex, 1);
    setCourses(updatedCourses);
  };

  const deleteTopic = (courseIndex: number, topicIndex: number) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].topics.splice(topicIndex, 1);
    setCourses(updatedCourses);
  };

  const deleteSubtopic = (
    courseIndex: number,
    topicIndex: number,
    subtopicIndex: number
  ) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].topics[topicIndex].subtopics.splice(
      subtopicIndex,
      1
    );
    setCourses(updatedCourses);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addCourseDetails(courses);
    console.log(courses);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {courses.map((course, courseIndex) => (
          <Paper key={courseIndex} radius="md" shadow="sm" className="mb-5 p-5">
            <div className="flex items-center align-center">
              <Title order={3}>Course {courseIndex + 1}</Title>
              <IconSquarePlus
                className="ml-5 text-blue-500 cursor-pointer"
                onClick={() => addCourse()}
              />
              <IconTrash
                className="ml-3 text-red-500 cursor-pointer"
                onClick={() => deleteCourse(courseIndex)}
              />
            </div>

            <Grid gutter="lg">
              <Col span={6}>
                <InputBase
                  label="Course Name"
                  placeholder="Enter course name"
                  value={course.courseName}
                  onChange={(e) =>
                    handleCourseChange(
                      courseIndex,
                      "courseName",
                      e.target.value
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <InputBase
                  label="Course Code"
                  placeholder="Enter course code"
                  value={course.courseCode}
                  onChange={(e) =>
                    handleCourseChange(
                      courseIndex,
                      "courseCode",
                      e.target.value
                    )
                  }
                />
              </Col>
            </Grid>
            <div className="flex items-center align-center mt-5 mb-2 ml-5">
              <Title order={4}>Topics:</Title>
              <IconSquarePlus
                className="ml-5 text-blue-500 cursor-pointer"
                onClick={() => addTopic(courseIndex)}
              />
            </div>
            {course.topics.map((topic, topicIndex) => (
              <Paper key={topicIndex} radius="md" className="pl-5 mb-5">
                <Grid gutter="md">
                  <Col span={8} className="flex place-items-end">
                    <InputBase
                      label="Topic Name"
                      placeholder="Enter topic name"
                      value={topic.topicName}
                      onChange={(e) =>
                        handleTopicChange(
                          courseIndex,
                          topicIndex,
                          e.target.value
                        )
                      }
                    />
                    <IconTrash
                      size="20"
                      className="ml-3 text-red-500 cursor-pointer"
                      onClick={() => deleteTopic(courseIndex, topicIndex)}
                    />
                  </Col>
                </Grid>
                <div className="flex items-center align-center mt-5 mb-2 ml-5">
                  <Title order={5}>Subtopics:</Title>
                  <IconSquarePlus
                    className="ml-5 text-blue-500 cursor-pointer"
                    onClick={() => addSubtopic(courseIndex, topicIndex)}
                  />
                </div>
                {topic.subtopics.map((subtopic, subtopicIndex) => (
                  <Grid key={subtopicIndex} gutter="md" className="mb-2 pl-5">
                    <Col span={8} className="flex place-items-end">
                      <InputBase
                        label="Subtopic Name"
                        placeholder="Enter subtopic name"
                        value={subtopic.subtopicName}
                        onChange={(e) =>
                          handleSubtopicChange(
                            courseIndex,
                            topicIndex,
                            subtopicIndex,
                            e.target.value
                          )
                        }
                      />
                      <IconTrash
                        size="20"
                        className="ml-3 text-red-500 cursor-pointer"
                        onClick={() =>
                          deleteSubtopic(courseIndex, topicIndex, subtopicIndex)
                        }
                      />
                    </Col>
                  </Grid>
                ))}
              </Paper>
            ))}
          </Paper>
        ))}
        <Button type="submit" className="block bg-blue-500">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CourseForm;
