import React, { useCallback } from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { AppShell, Navbar, Accordion } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";

type Props = {};

const ResourceHierarchy = (props: Props) => {
  const navigate = useNavigate();
  const handleLogoClick = useCallback(() => {
    console.log("Logo clicked");
    navigate("/");
  }, [navigate]);
  const data = {
    name: "root",
    children: [
      { name: "Resource.pdf", value: 10 },
      { name: "Resource2.ppt", value: 20 },
      {
        name: "HCI Evaluation",
        children: [
          { name: "Resource3.mp3", value: 5 },
          { name: "Resource4.mp4", value: 8 },
        ],
      },
    ],
  };

  // Define a custom color scheme based on the 'color' property in your data
  const customColorScheme = () => {
    // Generate random values for red and green channels
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);

    // Set the blue channel to 0
    const randomBlue = 0;

    // Create a CSS color string in the format "rgb(r, g, b)"
    const color = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;

    return color;
  };

  // Define the onClick handler
  const handleLeafClick = (node: any) => {
    if (!node.children) {
      console.log(`Clicked on leaf node: ${node.data.name}`);
    }
  };

  return (
    <AppShell
      padding="md"
      header={<HeaderBar onLogoClick={handleLogoClick} />}
      navbar={
        <Navbar width={{ base: 300 }} height="full" p="md">
          <Accordion>
            <Accordion.Item value="customization">
              <Accordion.Control>Customization</Accordion.Control>
              <Accordion.Panel>
                <Accordion>
                  <Accordion.Item value="customization">
                    <Accordion.Control className="text-md">
                      Customization
                    </Accordion.Control>
                    <Accordion.Panel className="text-sm">
                      Colors, fonts, shadows and many other parts are
                      customizable to not fit your design needs
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="flexibility">
                    <Accordion.Control>Flexibility</Accordion.Control>
                    <Accordion.Panel className="text-sm">
                      Configure components appearance and behavior with vast
                      amount of settings or overwrite any part of component
                      styles
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="focus-ring">
                    <Accordion.Control>
                      No annoying focus ring
                    </Accordion.Control>
                    <Accordion.Panel className="text-sm">
                      With new :focus-visible pseudo-class focus ring appears
                      only when user navigates with keyboard
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="flexibility">
              <Accordion.Control>Flexibility</Accordion.Control>
              <Accordion.Panel className="text-sm">
                Configure components appearance and behavior with vast amount of
                settings or overwrite any part of component styles
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="focus-ring">
              <Accordion.Control>No annoying focus ring</Accordion.Control>
              <Accordion.Panel className="text-sm">
                With new :focus-visible pseudo-class focus ring appears only
                when user navigates with keyboard
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <ResponsiveCirclePacking
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="value"
        colors={customColorScheme}
        childColor={{ from: "color", modifiers: [["darker", 0.3]] }}
        leavesOnly
        enableLabels
        onClick={handleLeafClick} // Attach the onClick handler to the chart
      />
    </AppShell>
  );
};

export default ResourceHierarchy;
