import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [newPost, setNewPost] = useState('');
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const token = localStorage.getItem('token');
    
    axios.post(`${import.meta.env.VITE_BASE_URL}/post/create`, { content: newPost }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if(res.status === 201) {
          setNewPost('');
          navigate('/'); // Redirect to Feed
        }
      })
      .catch((err) => {
        console.error('Failed to create post', err);
        setError('Failed to create post. Please try again.');
      });
  };

  if (!user) {
    return (
      <div className="container" style={{ maxWidth: '600px', textAlign: 'center', marginTop: '2rem' }}>
        <h2>Please log in to create a post</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h2>Create a New Post</h2>
        {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's happening?"
            rows="5"
            style={{ resize: 'none', marginBottom: '1rem', border: 'none', fontSize: '1.25rem', padding: '0.5rem 0' }}
          />
          <div className="flex" style={{ justifyContent: 'flex-end' }}>
            <button type="submit" style={{ padding: '0.75rem 2rem' }}>Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
