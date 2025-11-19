// src/components/CreatePostForm.jsx
import React, { useState } from "react";
import MapPicker from "./MapPicker";
import supabase from "../supabase";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      alert("Please select a location on the map!");
      return;
    }

    const { data, error } = await supabase.from("posts").insert([
      {
        title,
        content,
        image_url: imageUrl,
        location_lat: location.lat,
        location_lon: location.lng,
        created_at: new Date(),
        upvotes_count: 0,
      },
    ]);

    if (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. See console for details.");
    } else {
      console.log("Post created:", data);
      // Reset form
      setTitle("");
      setContent("");
      setImageUrl("");
      setLocation(null);
      alert("Post created successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Create a Bird Sighting</h2>

      <label>
        Title:
        <input
          type="text"
          placeholder="Bird Name or Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>

      <label>
        Content:
        <textarea
          placeholder="Describe your sighting..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>

      <label>
        Image URL:
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>

      <h4>Pick location on map:</h4>
      <MapPicker setLocation={setLocation} />
      {location && (
        <p>
          Selected Location: Latitude {location.lat.toFixed(5)}, Longitude{" "}
          {location.lng.toFixed(5)}
        </p>
      )}

      <button type="submit" style={{ marginTop: "10px" }}>
        Create Post
      </button>
    </form>
  );
}
