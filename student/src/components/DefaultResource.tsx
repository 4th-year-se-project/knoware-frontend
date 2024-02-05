import { Title } from "@mantine/core";
import React from "react";

type Props = {
  title: string;
  key: number;
  image: string;
  onClick: () => void;
};

function DefaultResource(props: Props) {
  return (
    <div
      onClick={props.onClick}
      className="m-6    rounded-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
    >
      <Title order={4}>{props.title}</Title>
      <img
        key={props.key}
        src={props.image}
        width={400}
        alt={`image-${props.key}`}
      />
    </div>
  );
}

export default DefaultResource;
