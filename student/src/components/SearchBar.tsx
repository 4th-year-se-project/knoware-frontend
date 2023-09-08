import React, { useCallback } from "react";
import { Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQuery } from "../slices/querySlice";

type Props = {
  long?: boolean;
  initialQuery?: string;
};

const SearchBar = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryValue, setQueryValue] = React.useState("");

  const handleSearchClick = () => {
    dispatch(setQuery(queryValue));
    navigate("/search-results");
  };

  return (
    <Group className="flex items-center">
      <TextInput
        placeholder="Search for resources"
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
          console.log("Query Value:", event.currentTarget.value);
          console.log("Query Value 2:", queryValue);
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleSearchClick();
          }
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
