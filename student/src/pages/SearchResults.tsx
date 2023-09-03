import React, { useCallback } from "react";
import {
  AppShell,
  Header,
  Container,
  Avatar,
  Group,
  Text,
  Skeleton,
} from "@mantine/core";
import Logo from "../assets/images/logo.svg";
import SearchBar from "../components/SearchBar";
import DefaultAvatar from "../assets/images/avatar.jpg";
import { ResourceCard } from "../components";
import { useNavigate } from "react-router-dom";

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
      header={
        <Header height={80} className="flex items-center justify-between px-40">
          <div className="flex items-center">
            <img
              src={Logo}
              alt="logo"
              width={100}
              className="cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>
          <div className="flex-1 flex justify-center mb-4">
            <SearchBar />
          </div>
          <Group className="flex items-center">
            <Avatar src={DefaultAvatar} radius="xl" alt="it's me" />
            <Text color="dimmed" size="sm">
              John Doe
            </Text>
          </Group>
        </Header>
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
