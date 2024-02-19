import React, { useState, useEffect } from "react";
import { Group, Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { setQuery } from "../slices/querySlice";

type Props = {
  long?: boolean;
  initialQuery?: string;
  onSearch: (query: string) => void;
};

const SearchBar = (props: Props) => {
  const dispatch = useDispatch();
  const [queryValue, setQueryValue] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedSearchHistory = localStorage.getItem("searchHistory");
    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }
  }, []);

  const handleSearchClick = () => {
    const updatedHistory = [queryValue, ...searchHistory.filter((q) => q !== queryValue)].slice(0, 5);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);

    dispatch(setQuery(queryValue));
    props.onSearch(queryValue);
  };

  return (
    <Group className="flex items-center">
      <Autocomplete
        placeholder="Enter something you remember from the lecture and we'll find it for you!"
        data={searchHistory}
        radius="xl"
        limit={5}
        defaultValue={props.initialQuery}
        styles={() => ({
          input: {
            "&:focus-within": {
              borderColor: "#5452FF",
            },
          },
        })}
        onInput={(event) => {
          setQueryValue(event.currentTarget.value);
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleSearchClick();
          }
        }}
        className={`border-purple-500 focus:border-purple-700 mt-4 ${
          props.long ? "w-[650px]" : "w-96"
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
