import React from "react";
import { Container, TextField } from "@mui/material";

export default function SearchBar() {
  return (
      <Container maxWidth="md" sx={{ mt: 20 }}>
        <TextField  type="
        search" id="search" label="Search" sx={{ width: 600 }} />
      </Container>
  );
}