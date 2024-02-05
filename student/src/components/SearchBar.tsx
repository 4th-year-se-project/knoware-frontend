import React, { useCallback } from "react";
import { Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQuery } from "../slices/querySlice";

type Props = {
  long?: boolean;
  initialQuery?: string;
  onSearch: (query: string) => void;
};

const SearchBar = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryValue, setQueryValue] = React.useState("");

  const handleSearchClick = () => {
    dispatch(setQuery(queryValue));
    props.onSearch(queryValue);
    // navigate("/search-results");
  };

  return (
    <Group className="flex items-center">
      <TextInput
        placeholder="Enter something you remember from the lecture and we'll find it for you!"
        radius="xl"
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
