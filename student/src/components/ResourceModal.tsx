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
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import { IconSearch } from "@tabler/icons-react";
import { getAllComments, addEmbeddingComment } from "../services/resourceAPI";

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
};

type Comment = {
  comment: string;
  is_lecturer_comment: boolean;
  timestamp: any;
  page_number: number;
};

function ResourceModal(props: Props) {
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getAllComments(props.doc_id);
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
      const response = await getAllComments(props.doc_id);
      setAllComments(response.data.comments);

      // Clear the input field
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="w w-full pr-2">
      <>
        <Title order={2}>{props.name}</Title>
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
            <p className="font-bold">Keywords</p>
            <Group mb="xs">
              {props.keywords.map((tag, index) => (
                <Badge key={index} color="indigo" variant="light">
                  {tag}
                </Badge>
              ))}
            </Group>
            <p className="font-bold">Matched Content</p>
            <Mark color="indigo" className="text-sm p-2">
              {props.content.length > 300
                ? props.content.substring(0, 300) + "..."
                : props.content}
            </Mark>
            <Button className="bg-black">View Resource</Button>
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

        {allComments?.map((comment: any, index: number) => (
          <CommentBox
            key={index}
            comment={comment.comment}
            is_lecturer_comment={comment.is_lecturer_comment}
            timestamp={comment.timestamp}
            page_number={comment.page_number}
          />
        ))}
      </>
    </div>
  );
}

export default ResourceModal;
