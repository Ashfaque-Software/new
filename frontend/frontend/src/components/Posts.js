import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../utils/api';
import './styles.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getPosts();
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <div>
      <h2>My Posts</h2>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>Device: {post.device}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
