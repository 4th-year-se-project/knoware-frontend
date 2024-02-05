import { Stack, Text } from "@mantine/core";
import { IconMusic } from "@tabler/icons-react";
import React from "react";

type Props = {
  textContent: string;
  onClick: () => void;
};

function AudioResource(props: Props) {
  const truncatedText =
    props.textContent.length > 100
      ? props.textContent.substring(0, 100) + "..."
      : props.textContent;

  return (
    <div onClick={props.onClick}>
      <Stack
        align="center"
        className="m-6 border-sky-100 border-8 rounded-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
      >
        <IconMusic size="6rem" />
        <Text className="p-6">{truncatedText}</Text>
      </Stack>
    </div>
  );
}

export default AudioResource;
