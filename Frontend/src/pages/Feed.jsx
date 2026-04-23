import { useState, useEffect } from 'react';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/post/all`)
      .then((res) => {
        if(res.status === 200) {
          setPosts(res.data.posts);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch posts', err);
      });
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div>
        {posts.map((post) => (
          <div key={post._id} className="card">
            <div className="post-header">
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {post.author?.fullname?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="post-author">{post.author?.fullname}</div>
                <div className="post-username">@{post.author?.username}</div>
              </div>
            </div>
            <div className="post-content mt-4">{post.content}</div>
            <div className="post-time">{new Date(post.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
