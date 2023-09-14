import { useState, useEffect } from "react";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { Badge, Group } from "@mantine/core";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getResourceInfo } from "../services/resourceAPI";

function RightSideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const query = useSelector((state: any) => state.query.value);
  const [resourceInfo, setResourceInfo] = useState<any>({});

  const getResouceInfo = async () => {
    try {
      const docID = sessionStorage.getItem("docID");

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
  }, [query]);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      className={`absolute right-0 h-100 border-l border-gray-200 transition-width duration-400 ease-in-out bg-white min-h-full ${
        collapsed ? "w-12" : "w-80"
      }`}
    >
      <div
        className="fixed p-2 cursor-pointer text-gray-500 bg-white z-10 w-full h-10 top-20"
        onClick={handleCollapsedChange}
      >
        {collapsed ? <IconChevronsLeft /> : <IconChevronsRight />}
      </div>
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
}
export default RightSideBar;
