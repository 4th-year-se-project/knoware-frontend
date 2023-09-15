import { useState, useEffect } from "react";
import { Badge, Group, Burger } from "@mantine/core";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getResourceInfo } from "../services/resourceAPI";
import { useDisclosure } from "@mantine/hooks";

const RightSideBar = ({ docID, onValueChange }: any) => {
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
    onValueChange(!collapsed);
  };
  return (
    <div
      className={`absolute right-0 h-100 border-l border-gray-200 transition-all duration-500 ease-in-out bg-white min-h-full z-10 ${
        collapsed ? "w-12" : "w-80"
      }`}
    >
      <Burger
        size="sm"
        className="fixed cursor-pointer text-gray-500 bg-white z-10 w-full h-10 top-20 ml-2"
        opened={opened}
        onClick={handleCollapsedChange}
      />
      <div className={`mt-28 p-4 ${collapsed ? "hidden" : "block"}`}>
        <Group>
          <p className="font-normal text-sm mb-2">{resourceInfo.title}</p>
        </Group>

        <Group mt={8}>
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
          <p className="text-xs/[17px] font-normal text-gray-500">
            {resourceInfo.content}
          </p>
        </Group>
      </div>
    </div>
  );
};
export default RightSideBar;
