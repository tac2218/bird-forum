import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabase.js";
import "../PostFeed.css";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [sortMode, setSortMode] = useState("recent"); // "recent" or "upvotes"

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*");

      if (error) console.error(error);
      else setPosts(data);
    };

    fetchPosts();
  }, []);

  // Apply sorting based on sortMode
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortMode === "upvotes") {
      return b.upvotes_count - a.upvotes_count; // highest first
    } else {
      return new Date(b.created_at) - new Date(a.created_at); // newest first
    }
  });

  return (
    <div>
      {/* SORT BUTTONS */}
      <div className="sort-controls">
        <button
          className={sortMode === "recent" ? "sort-button active" : "sort-button"}
          onClick={() => setSortMode("recent")}
        >
          Most Recent
        </button>

        <button
          className={sortMode === "upvotes" ? "sort-button active" : "sort-button"}
          onClick={() => setSortMode("upvotes")}
        >
          Most Upvoted
        </button>
      </div>

      {/* FEED */}
      <div className="feed-container">
        {sortedPosts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="image-wrapper">
              <img src={post.image_url} alt={post.title} />
            </div>

            <h2 className="post-title">{post.title}</h2>
            <p className="post-upvotes">{post.upvotes_count} upvotes</p>

            <Link to={`/post/${post.id}`} className="view-post-link">
              View Post
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
