import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabase.js';
import '../PostPage.css';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error(error);
      else setPost(data);
    };

    fetchPost();
  }, [id]);

  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes_count: post.upvotes_count + 1 })
      .eq('id', id);

    if (error) console.error(error);
    else setPost({ ...post, upvotes_count: post.upvotes_count + 1 });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-page-container">
      <div className="post-card">

        <h1>{post.title}</h1>

        {post.image_url && (
          <div className="post-card-image-wrapper">
            <img
              src={post.image_url}
              alt={post.title}
              className="post-card-image"
            />
          </div>
        )}

        <p>{post.content}</p>

        <div className="post-card-footer">
          <button onClick={handleUpvote} className="upvote-button">
            Upvote
          </button>
          <p>Upvotes: {post.upvotes_count}</p>
        </div>

      </div>
    </div>
  );
};

export default PostPage;
