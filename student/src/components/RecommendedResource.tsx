import { Title, Badge } from "@mantine/core";
import React from "react";

type Props = {
  title: string;
  key: number;
  image: string;
  onClick: () => void;
};

const badgeStyle = {
    borderRadius: 0,
    backgroundColor: "#A855F7",
    color: "#FFFFFF",
};
  

function RecommendedResource(props: Props) {
  return (
    <div onClick={props.onClick}
    className="m-6 rounded-md transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <Badge
        color="purple"
        className="absolute right-0 z-10 bottom-0 mr-0 roun"
        style={badgeStyle}
      >
        Recommended
      </Badge>
      <Title order={4} >
        {props.title}
      </Title>
      <div
        onClick={props.onClick}
        className="border-4 border-purple-500" >
        <img
          key={props.key}
          src={props.image}
          width={400}
          alt={`image-${props.key}`}
          className="z-1"
        />
      </div>
    </div>
  );
}

export default RecommendedResource;
