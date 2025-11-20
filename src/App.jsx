// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostFeed from "./components/PostFeed";
import CreatePostForm from "./components/CreatePostForm";
import PostPage from "./components/PostPage";
import MapPage from "./components/Map";

function App() {
  return (
    <Router>
      <div>
        <Link to="/" style= {{ textDecoration: "none" }}>
          <h1 
            style={{ 
              textAlign: "center", 
              color: "#646cff",       // same color as your Link hover default
              backgroundColor: "white",
              paddingTop: "1rem",
            }}
          >
            Bird-Talk
          </h1>
        </Link>
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link to="/create" style={{ marginRight: "1rem" }}>Create Post</Link>
          <Link to="/map">Map</Link>
        </nav>
      </div>


      <div className="container">
        <Routes>
          <Route path="/" element={<PostFeed />} />
          <Route path="/create" element={<CreatePostForm />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
