import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, SearchResults, ResourceHierarchy, NotFound } from "./pages";
import { store } from "./store";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import { useAuth } from "./login/authContext";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search-results"
            element={
              isAuthenticated ? <SearchResults /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/resource-hierarchy"
            element={
              isAuthenticated ? <ResourceHierarchy /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
