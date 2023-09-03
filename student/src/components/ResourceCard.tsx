import {
  Card,
  Text,
  Badge,
  Mark,
  rem,
  Breadcrumbs,
  Group,
} from "@mantine/core";
import { IconFileTypePdf, IconPresentation } from "@tabler/icons-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type ResourceCardProps = {
  title: string;
  topics: string[];
  content: string;
  tags: string[];
};

const getFileExtension = (title: string): string | null => {
  const parts = title.split(".");
  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase();
  }
  return null;
};

const ResourceCard = ({ title, topics, content, tags }: ResourceCardProps) => {
  const navigate = useNavigate();

  const handleResultClick = useCallback(() => {
    console.log("Search clicked");
    navigate("/resource-hierarchy");
  }, [navigate]);

  const fileExtension = getFileExtension(title);
  // Map the file extension to an icon
  let icon = null;
  if (fileExtension === "pdf") {
    icon = <IconFileTypePdf size={rem(40)} />;
  } else if (fileExtension === "ppt" || fileExtension === "pptx") {
    icon = <IconPresentation size={rem(40)} />;
  }
  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      className="min-w-full mt-4 cursor-pointer"
      onClick={handleResultClick}
    >
      <Card.Section></Card.Section>
      <Group position="apart" mt="md">
        <div>
          <Text weight={500}>{title}</Text>
          <Group mt={8} mb="xs">
            {topics.map((topic, index) => (
              <Badge key={index} color="indigo" variant="light">
                {topic}
              </Badge>
            ))}
          </Group>
        </div>
        {icon}
      </Group>
      <Breadcrumbs separator="→" mt="xs" mb="md">
        {tags.map((tag, index) => (
          <Text key={index} color="indigo.7">
            {tag}
          </Text>
        ))}
      </Breadcrumbs>
      <Text size="sm">
        <Mark color="indigo">{content}</Mark>
      </Text>
    </Card>
  );
};

export default ResourceCard;