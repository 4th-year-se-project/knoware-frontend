import React from "react";
import { Container, TextField, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="App">
      <div className="knoware-title">
        <h1>KnoWare</h1>
      </div>
      <Container className="search-container" maxWidth="md" sx={{ mt: 20 }}>
        <Stack alignItems="center">
          <Button className="upload-btn" variant="contained" component="label">
            +
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Stack>
        <TextField
          id="search"
          type="search"
          label="Search"
          className="search-field"
          value={searchTerm}
          onChange={handleChange}
          sx={{ width: 600 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            style: {
              borderRadius: '50px',
              border: '1px solid #5552FF'
            }
          }}
        />
      </Container>
    </div>
  );
};

export default SearchBar;
