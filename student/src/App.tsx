import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SearchResults, ResourceHierarchy, NotFound } from "./pages";
import { store } from "./store";
import { Provider } from "react-redux";
import Login from "./pages/Login";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/resource-hierarchy" element={<ResourceHierarchy />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
