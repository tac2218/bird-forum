// src/components/Map.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import supabase from "../supabase";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Default marker icon fix for React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*");

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading map...</div>;

  // Default center if no posts
  const defaultCenter = posts.length
    ? [posts[0].location_lat, posts[0].location_lon]
    : [40.785091, -73.968285]; // Central Park as fallback

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {posts.map((post) => (
        <Marker
          key={post.id}
          position={[post.location_lat, post.location_lon]}
        >
          <Popup>
            <strong>{post.title}</strong>
            <br />
            {post.content && <span>{post.content}</span>}
            {post.image_url && (
              <div>
                <img
                  src={post.image_url}
                  alt={post.title}
                  style={{ width: "100px", marginTop: "5px" }}
                />
              </div>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
