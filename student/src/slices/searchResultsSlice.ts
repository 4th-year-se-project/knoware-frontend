// searchResultsSlice.js

import { createSlice } from "@reduxjs/toolkit";

export interface SearchResultsState {
  value: any[];
}

const initialState: SearchResultsState = {
  value: [],
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setResults } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
