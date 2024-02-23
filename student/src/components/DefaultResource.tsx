import { Badge, Title, Card } from "@mantine/core";
import React from "react";

type Props = {
  title: string;
  key: number;
  image: string;
  onClick: () => void;
  isRecommended: boolean;
};

const badgeStyle = {
  borderRadius: 0,
  backgroundColor: "#A855F7",
  color: "#FFFFFF",
};

function DefaultResource(props: Props) {
  return (
    <Card
      shadow="sm"
      style={{ padding: 0 }}
      radius="md"
      withBorder
      className="m-2"
    >
      {" "}
      <div
        onClick={props.onClick}
        className="m-6 rounded-md transition-transform transform hover:scale-105 duration-300 ease-in-out "
      >
        {props.isRecommended && (
          <Badge
            color="purple"
            className="absolute right-0 z-10 bottom-0 mr-0 roun"
            style={badgeStyle}
          >
            Recommended
          </Badge>
        )}
        <Title order={4} className="w-2/3 whitespace-normal">
          {props.title.length > 40
            ? props.title.substring(0, 20) + "..."
            : props.title}
        </Title>
        <img
          className={`${
            props.isRecommended ? "border-4 border-purple-500" : ""
          }`}
          key={props.key}
          src={props.image}
          width={400}
          alt={`image-${props.key}`}
        />
      </div>
    </Card>
  );
}

export default DefaultResource;
