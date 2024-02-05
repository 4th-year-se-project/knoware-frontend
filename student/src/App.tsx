// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { Home, SearchResults, ResourceHierarchy, LecturerDashboard, NotFound } from "./pages";
// import { store } from "./store";
// import { Provider } from "react-redux";
// import Login from "./pages/Login";
// import { useAuth } from "./login/authContext";

// function App() {
//   const { isAuthenticated } = useAuth();
//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           <Route path="/" element={ isAuthenticated ? <Home /> : <Navigate to="/login" /> } />
//           <Route path="/search-results" element={ isAuthenticated ? <SearchResults /> : <Navigate to="/login" /> } />
//           <Route path="/resource-hierarchy" element={ isAuthenticated ? <ResourceHierarchy /> : <Navigate to="/login" /> } />
//           <Route path="*" element={<NotFound />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<LecturerDashboard />} />
//         </Routes>
//       </Router>
//     </Provider>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  SearchResults,
  ResourceHierarchy,
  LecturerDashboard,
  NotFound,
} from "./pages";
import { store } from "./store";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import { useAuth } from "./login/authContext";

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
          <Route path="/dashboard" element={<LecturerDashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
