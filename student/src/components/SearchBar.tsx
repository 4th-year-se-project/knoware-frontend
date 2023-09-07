// SearchBar.js or SearchBar.tsx

import React, { useCallback } from "react";
import { Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { search } from "../services/searchAPI";
import { useDispatch } from "react-redux";
import { setResults } from "../slices/searchResultsSlice";

type Props = {
  long?: boolean;
};

const SearchBar = (props: Props) => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState<string>("");
  const dispatch = useDispatch();

  const handleSearchClick = useCallback(async () => {
    try {
      const data = {
        query: query,
      };
      const results = await search(data);
      dispatch(setResults(results.data.results));

      navigate("/search-results");
    } catch (error) {
      console.error("Error searching for resources:", error);
    }
  }, [navigate, query]);

  return (
    <Group className="flex items-center">
      <TextInput
        placeholder="Search for resources"
        radius="xl"
        styles={() => ({
          input: {
            "&:focus-within": {
              borderColor: "#5452FF",
            },
          },
        })}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
        className={`border-purple-500 focus:border-purple-700 mt-4 ${
          props.long ? "w-[450px]" : "w-96"
        }`}
        rightSection={
          <IconSearch
            size="1.2rem"
            style={{
              color: "#5452FF",
            }}
            onClick={handleSearchClick}
            className="cursor-pointer"
          />
        }
      />
    </Group>
  );
};

export default SearchBar;
