import {
  Card,
  Text,
  Badge,
  Mark,
  rem,
  Breadcrumbs,
  Group,
} from "@mantine/core";
import {
  IconBrandYoutubeFilled,
  IconFileTypePdf,
  IconPresentation,
} from "@tabler/icons-react";
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
  } else {
    icon = <IconBrandYoutubeFilled size={rem(40)} />;
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
        </div>
        {icon}
      </Group>
      <Group mt={8} mb="xs">
        {tags.map((tag, index) => (
          <Badge key={index} color="indigo" variant="light">
            {tag}
          </Badge>
        ))}
      </Group>
      <Breadcrumbs separator="→" mt="lg" mb="md">
        {topics.map((topic, index) => (
          <Text key={index} color="indigo.7">
            {topic}
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
