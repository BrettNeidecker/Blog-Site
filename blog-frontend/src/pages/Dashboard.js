import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [username, setUsername] = useState('');

    // Decode the token to get the username
    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve the JWT
        if (token) {
            try {
                const decoded = jwtDecode(token); // Decode the token
                setUsername(decoded.username); // Set the username
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.error('No token found in local storage!');
        }
    }, []);

    // Fetch user posts once the username is available
    useEffect(() => {
        if (!username) return; // Wait until username is set
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${username}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [username]); // Re-run when `username` changes

    // Handle creating a new post
    const handleCreatePost = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, newPost, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts([response.data, ...posts]); // Add new post to state
            setNewPost({ title: '', content: '' }); // Reset fields
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <h1>Your Dashboard</h1>
            {username && <h2>Welcome, {username}!</h2>} {/* Display username */}
            
            <h2>Create a New Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <textarea
                placeholder="Content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
            <button onClick={handleCreatePost}>Create Post</button>

            <h2>Your Posts</h2>
            {posts.map((post) => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;

