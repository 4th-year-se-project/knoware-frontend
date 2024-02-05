import {
  Breadcrumbs,
  Button,
  Flex,
  Group,
  Mark,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";

type Props = {
  onClose: () => void; // Callback function to close the modal
  name: string;
  course: string;
  topic: string;
  image: string;
  content: string;
};

function ResourceModal(props: Props) {
  return (
    <div className="w w-full">
      <>
        <Title order={2}>{props.name}</Title>
        <Breadcrumbs separator="→" mt="lg" mb="md">
          <Text color="indigo.7">{props.course}</Text>
          <Text color="indigo.7">{props.topic}</Text>
        </Breadcrumbs>
        <p>Keywords</p>
        <Flex gap="md">
          <img src={props.image} alt="resource" className=" max-w-md" />
          <Stack>
            <p className=" font-bold">Matched Content</p>
            <Mark color="indigo">
              {props.content.length > 300
                ? props.content.substring(0, 300) + "..."
                : props.content}
            </Mark>
            <Button className="bg-black">View Resource</Button>
          </Stack>
        </Flex>
      </>
    </div>
  );
}

export default ResourceModal;
