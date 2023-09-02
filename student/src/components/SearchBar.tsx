// SearchBar.js or SearchBar.tsx

import React, { useCallback } from "react";
import { Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const handleSearchClick = useCallback(() => {
    console.log("Search clicked");
    navigate("/search-results");
  }, [navigate]);

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
        className="border-purple-500 focus:border-purple-700 mt-4 w-96"
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
