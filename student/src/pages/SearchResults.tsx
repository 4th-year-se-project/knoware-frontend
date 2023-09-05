import React, { useCallback } from "react";
import { AppShell, Container, Text, Skeleton } from "@mantine/core";
import { ResourceCard } from "../components";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";

type Props = {};

const SearchResults = (props: Props) => {
  const navigate = useNavigate();
  const handleLogoClick = useCallback(() => {
    console.log("Logo clicked");
    navigate("/");
  }, [navigate]);

  return (
    <AppShell
      padding="md"
      header={<HeaderBar onLogoClick={handleLogoClick} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container className="min-w-full px-36">
        <Text>Choose a resource to explore:</Text>
        <ResourceCard
          title="final-challenge-specs.ppt"
          topics={["HCI", "Exploratory Design"]}
          content="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway. With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway. With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway. With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway"
          tags={["Human Computer Interaction", "Exploratory Design", "Design"]}
        />
        <ResourceCard
          title="final-challenge-specs.pdf"
          topics={["HCI", "Exploratory Design"]}
          content="With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway. With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway. With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway. With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway"
          tags={["Human Computer Interaction", "Exploratory Design", "Design"]}
        />
        <Skeleton visible={true} mt="md" height={200} radius={8}>
          Lorem ipsum dolor sit amet...
          {/* other content */}
        </Skeleton>
      </Container>
    </AppShell>
  );
};

export default SearchResults;
