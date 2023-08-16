import React from "react";
import { Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function SearchBar() {
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
      className="search-field"
        type="search"
        id="search"
        label="Search"
      />
      <Button className="upload-btn" variant="contained" component="label">
        Search
      </Button>
    </Container>
  </div>
  );
}