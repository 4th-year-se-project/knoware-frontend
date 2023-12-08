import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import React from "react";

type Props = {
  success: boolean;
  onClose: () => void;
};

const EmbedAlert = (props: Props) => {
  const icon = props.success ? (
    <IconAlertCircle size="1rem" />
  ) : (
    <IconAlertCircle size="1rem" />
  );
  const title = props.success ? "Success!" : "Bummer!";
  const color = props.success ? "green" : "red";
  const message = props.success
    ? "Your resource was successfully embedded!"
    : "Something went wrong with uploading your resource. Please try again.";
  return (
    <Alert
      className="w-[500px] mt-4"
      icon={icon}
      title={title}
      color={color}
      withCloseButton
      onClose={props.onClose}
    >
      {message}
    </Alert>
  );
};

export default EmbedAlert;
