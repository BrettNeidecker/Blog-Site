import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    // Fetch user posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

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
            {posts.map(post => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
