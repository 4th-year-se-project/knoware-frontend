import { configureStore } from "@reduxjs/toolkit";
import resultsReducer from "./slices/searchResultsSlice";

export const store = configureStore({
  reducer: {
    results: resultsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
