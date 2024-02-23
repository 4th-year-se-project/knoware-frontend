import {
  Breadcrumbs,
  Button,
  Flex,
  Group,
  Mark,
  Stack,
  Text,
  Title,
  InputBase,
  Badge,
  Textarea,
  Select,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import CommentsAccordion from "./CommentsAccordian";
import { IconEdit, IconSearch } from "@tabler/icons-react";
import {
  getAllComments,
  addEmbeddingComment,
  editResourceLabel,
} from "../services/resourceAPI";
import { getPdf } from "../services/resourceAPI";

type Props = {
  onClose: () => void; // Callback function to close the modal
  name: string;
  course: string;
  topic: string;
  image: string;
  content: string;
  doc_id: number;
  embedding_id: number;
  keywords: [];
  label: string;
  id: number;
  type: string;
  link: string;
};

type Comment = {
  comment: string;
  is_lecturer_comment: boolean;
  timestamp: any;
  page_number: number;
  comment_date_added: any;
};

type AllComments = {
  embeddingComment: Comment[];
  otherEmbeddingComments: Comment[];
  lecturerComment: Comment[];
};

function ResourceModal(props: Props) {
  const [allComments, setAllComments] = useState<AllComments>({
    embeddingComment: [],
    otherEmbeddingComments: [],
    lecturerComment: [],
  });
  const [newComment, setNewComment] = useState("");
  const [label, setLabel] = useState<string | null>(props.label);
  const [editableLabel, setEditableLabel] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getAllComments(props.doc_id, props.embedding_id);
        console.log(response);
        setAllComments(response.data.comments);
        //setAllComments(response.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [props.doc_id]);

  const handleAddComment = async () => {
    try {
      // Call the API to add a new comment
      await addEmbeddingComment(props.doc_id, props.embedding_id, newComment);

      // Fetch updated comments after adding a new comment
      const response = await getAllComments(props.doc_id, props.embedding_id);
      setAllComments(response.data.comments);

      // Clear the input field
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const enterEditMode = () => {
    setIsEditMode(true);
    setEditableLabel(props.label);
  };

  const exitEditMode = () => {
    setIsEditMode(false);
    setEditableLabel(null);
  };

  const updateLabel = async () => {
    const res = await editResourceLabel(props.id, editableLabel);
    setLabel(editableLabel);
    exitEditMode();
    console.log(res);
  };

  const openPdfInNewWindow = async () => {
    try {
      // Fetch the PDF using the getPdf function
      const response = await getPdf(props.doc_id);

      // Create a blob URL for the PDF content
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new window
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error fetching or opening PDF:", error);
    }
  };

  const viewResource = async () => {
    if (props.type === "pdf") {
      openPdfInNewWindow();
    } else if (props.type === "youtube") {
      console.log(props.link)
      window.open(props.link, "_blank");
    }
  };

  return (
    <div className="w w-full pr-2">
      <>
        <div className="flex justify-between place-items-center">
          <Title order={2} className="whitespace-normal text-ellipsis overflow-hidden">{props.name}</Title>
          <div className="flex justify-between">
            {isEditMode ? (
              <>
                <Flex direction="column">
                  <Select
                    data={
                      label
                        ? label === "High priority"
                          ? ["Medium priority", "Low priority"]
                          : label === "Medium priority"
                          ? ["High priority", "Low priority"]
                          : ["High priority", "Medium priority"]
                        : ["High priority", "Medium priority", "Low priority"]
                    }
                    value={editableLabel}
                    onChange={(value) => setEditableLabel(value)}
                    placeholder="Select priority"
                    clearable
                  />
                  <Flex direction="row" justify="flex-end" gap="sm">
                    <Button
                      onClick={updateLabel}
                      variant="filled"
                      size="xs"
                      style={{
                        zIndex: 1,
                        backgroundColor: "#007BFF",
                        color: "#FFFFFF",
                        marginTop: 8,
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={exitEditMode}
                      style={{
                        marginTop: 8,
                        zIndex: 1,
                        backgroundColor: "#FFFFFF",
                        color: "#FF0000",
                        border: "2px solid #FF0000",
                      }}
                      variant="filled"
                      size="xs"
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Flex>
              </>
            ) : (
              <>
                <div className="flex mt-auto mb-auto">
                  {label ? (
                    <Badge
                      variant="filled"
                      fullWidth
                      className="mt-auto mb-auto"
                    >
                      {label}
                    </Badge>
                  ) : (
                    <Badge variant="light" className="mt-auto mb-auto">
                      Add label
                    </Badge>
                  )}

                  <Button
                    onClick={enterEditMode}
                    style={{ marginLeft: 4 }}
                    variant="link"
                    size="xs"
                  >
                    <IconEdit />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>{" "}
        <Breadcrumbs separator="→" mt="xs" mb="lg">
          <Text color="indigo.7">{props.course}</Text>
          <Text color="indigo.7">{props.topic}</Text>
        </Breadcrumbs>
        <Flex gap="md">
          <img
            src={props.image}
            alt="resource"
            className=" max-w-md border border-gray-300 h-auto"
          />
          <Stack>
            {props.keywords.length > 0 && (
              <>
                <p className="font-bold">Keywords</p>
                <Group mb="xs">
                  {props.keywords.map((tag, index) => (
                    <Badge key={index} color="indigo" variant="light">
                      {tag}
                    </Badge>
                  ))}
                </Group>
              </>
            )}

            <p className="font-bold">Matched Content</p>
            <Mark color="indigo" className="text-sm p-2">
              {props.content.length > 300
                ? props.content.substring(0, 300) + "..."
                : props.content}
            </Mark>
            <Button className="bg-black" onClick={viewResource}>
              View Resource
            </Button>
          </Stack>
        </Flex>
        <div className="flex place-items-end mt-10 mb-10">
          <Textarea
            placeholder="Add comment..."
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            autosize
            minRows={2}
            defaultValue=""
            size="sm"
            className="w-full"
          />
          <Button
            className="bg-blue-500 ml-5 text-sm w-16 h-8 hover:bg-blue-600"
            onClick={handleAddComment}
          >
            Add
          </Button>
        </div>
        <CommentsAccordion
          embeddingComment={allComments.embeddingComment}
          otherEmbeddingComments={allComments.otherEmbeddingComments}
          lecturerComment={allComments.lecturerComment}
        />
      </>
    </div>
  );
}

export default ResourceModal;
