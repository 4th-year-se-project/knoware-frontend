import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SearchResults, ResourceHierarchy, NotFound } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/resource-hierarchy" element={<ResourceHierarchy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
