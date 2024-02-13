import {
  Breadcrumbs,
  Button,
  Flex,
  Mark,
  Stack,
  Text,
  Title,
  Badge,
  Select,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import React, { useState } from "react";
import { editResourceLabel } from "../services/resourceAPI";

type Props = {
  onClose: () => void; // Callback function to close the modal
  name: string;
  course: string;
  topic: string;
  image: string;
  content: string;
  label: string;
  id: number;
};

function ResourceModal(props: Props) {
  const [label, setLabel] = useState<string | null>(props.label);
  const [editableLabel, setEditableLabel] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

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

  return (
    <div className="w w-full">
      <>
        <div className="flex justify-between">
          <Title order={2}>{props.name}</Title>
          <div className="flex justify-between mt-auto mb-auto">
            {isEditMode ? (
              <>
                <Flex direction="column">
                  <Select
                    data={
                      label === "High priority"
                        ? ["Medium priority", "Low priority"]
                        : label === "Medium priority"
                        ? ["High priority", "Low priority"]
                        : ["High priority", "Medium priority"]
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
                  <Badge variant="filled" fullWidth className="mt-auto mb-auto">
                    {label}
                  </Badge>
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
        </div>
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
