import React, { useCallback, useEffect, useState } from "react";
import { AppShell, Container, Text, Skeleton } from "@mantine/core";
import { ResourceCard } from "../components";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import { search } from "../services/searchAPI";
import { useSelector } from "react-redux/es/hooks/useSelector";

type Props = {};

const SearchResults = (props: Props) => {
  const navigate = useNavigate();
  const [results, setResults] = useState<any[]>([]);
  const query = useSelector((state: any) => state.query.value);
  const handleLogoClick = useCallback(() => {
    console.log("Logo clicked");
    navigate("/");
  }, [navigate]);

  // Function to perform the search and update results
  const performSearch = async () => {
    setResults([]);
    console.log(query);
    try {
      const data = {
        query: query,
      };
      // Perform your search logic here and update the results state
      const response = await search(data); // Replace with your actual search logic

      const newResults = response.data.results;

      setResults(newResults);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  useEffect(() => {
    // Call performSearch when the component mounts (on load)
    performSearch();
  }, [query]); // Empty dependency array means this effect runs once on mount

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

        {results.length === 0
          ? // Render skeletons in a loop when results are empty
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                visible={true}
                mt="md"
                height={200}
                radius={8}
              >
                {/* Placeholder content for the skeleton */}
              </Skeleton>
            ))
          : // Map results to cards when results are available
            results.map((result, index) => (
              <ResourceCard
                key={result.doc_id}
                title={result.title}
                topics={[]}
                content={result.content}
                tags={[]}
              />
            ))}
      </Container>
    </AppShell>
  );
};

export default SearchResults;
