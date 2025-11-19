import React, { useEffect, useState } from 'react';
import supabase from '../supabase';
import { Link } from 'react-router-dom';
import '../PostFeed.css'; // make sure this CSS file exists

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error(error);
      else setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed-container">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          {post.image_url && (
            <div className="image-wrapper">
              <img src={post.image_url} alt={post.title} />
            </div>
          )}
          <h3 className="post-title">{post.title}</h3>
          <p className="post-upvotes">Upvotes: {post.upvotes_count}</p>
          <Link to={`/post/${post.id}`} className="view-post-link">
            Read More &rarr;
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
