import { Badge, Title, Card, Menu, Button } from "@mantine/core";
import { IconTrash, IconEye, IconEyeOff, IconDotsVertical } from "@tabler/icons-react";
import React, { useState } from "react";

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
  const [hideResource, setHideResource] = useState(true);

  const handleHideResource = () => {
    hideResource ? setHideResource(false) : setHideResource(true)
  }
  return (
    <Card
      shadow="sm"
      style={{ padding: 8 }}
      radius="md"
      withBorder
      className="m-2 transition-transform transform hover:scale-105 duration-300 ease-in-out "
    >
      <div>
        {props.isRecommended && (
          <Badge
            color="purple"
            className="absolute right-0 z-10 bottom-2 right-2 mr-0 roun"
            style={badgeStyle}
          >
            Recommended
          </Badge>
        )}
        <div className="flex flex-row justify-between">
          <Title
            order={4}
            className="w-auto whitespace-normal overflow-hidden text-ellipsis"
          >
            {props.title}
          </Title>
          {!props.isRecommended && (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <IconDotsVertical size={16} cursor={"pointer"}/>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={hideResource ? <IconEye size={14}/> : <IconEyeOff size={14}/>} onClick={handleHideResource}>
                  Hide from others
                </Menu.Item>
                <Menu.Item icon={<IconTrash size={14} />}>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
        <img
          onClick={props.onClick}
          className={`${
            props.isRecommended ? "border-4 border-purple-500" : ""
          }`}
          key={props.key}
          src={props.image}
          width={400}
          alt={`${props.key}`}
        />
      </div>
    </Card>
  );
}

export default DefaultResource;
