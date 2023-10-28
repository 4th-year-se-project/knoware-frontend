import { useState, useEffect } from "react";
import { Badge, Group, Burger, Aside, ScrollArea } from "@mantine/core";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getResourceInfo } from "../services/resourceAPI";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { editTopic, deleteResource } from "../services/resourceAPI";

const ResourceBar = ({ docID }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const query = useSelector((state: any) => state.query.value);
  const [resourceInfo, setResourceInfo] = useState<any>({});
  const [opened, { toggle }] = useDisclosure(true);

  const getResouceInfo = async () => {
    try {
      if (docID !== null && docID !== undefined) {
        const response = await getResourceInfo(parseInt(docID, 10), query);
        setResourceInfo(response.data);
      } else {
        console.error("docID is null or undefined");
      }
    } catch (error) {
      console.error("Error getting resource info:", error);
    }
  };

  useEffect(() => {
    getResouceInfo();
  }, [docID]);

  const handleCollapsedChange = () => {
    toggle();
    setCollapsed(!collapsed);
  };

  const handleResourceDelete = async () => {
    try {
      const response = await deleteResource(parseInt(docID, 10));
      console.log(response);
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  const handleTopicEdit = async () => {};

  return (
    <Aside
      className="transition-all duration-500 ease-in-out "
      width={{ base: collapsed ? "45px" : "22%" }}
    >
      <Aside.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Burger
          size={15}
          className="fixed cursor-pointer text-gray-500 bg-white z-10 w-full h-10 top-20 ml-2"
          opened={opened}
          onClick={handleCollapsedChange}
        />
        <div className={`mt-8 p-4 ${collapsed ? "hidden" : "block"}`}>
          <Group>
            <p className="font-normal text-sm mb-2 whitespace-normal break-all overflow-hidden">
              {resourceInfo.title}
            </p>
          </Group>

          <Group mt={8} className="flex flex-wrap">
            {resourceInfo.keywords?.map((tag: any, index: any) => (
              <Badge key={index} color="indigo" variant="light">
                {tag}
              </Badge>
            ))}
          </Group>

          <Group mt={20}>
            <p>Open in:</p>
            <button className="bg-black text-white px-3 py-1 rounded-md text-sm min-w-32">
              PDF
            </button>
          </Group>

          <Group mt={20}>
            <p>Matched content:</p>
            <p className="text-xs/[17px] font-normal text-gray-500  whitespace-normal break-words overflow-hidden">
              {resourceInfo.content}
            </p>
          </Group>
          <Group mt={16}>
            <Button
              size="xs"
              leftIcon={<IconEdit size={14} />}
              variant="default"
              onClick={handleTopicEdit}
            >
              Edit Topic
            </Button>
            <Button
              size="xs"
              leftIcon={<IconTrash size={14} />}
              variant="light"
              color="red"
              onClick={handleResourceDelete}
            >
              Delete Resource
            </Button>
          </Group>
        </div>
      </Aside.Section>
    </Aside>
  );
};
export default ResourceBar;
