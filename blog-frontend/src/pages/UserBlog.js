import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserBlog({ match }) {
    const [posts, setPosts] = useState([]);
    const username = match.params.username; // Username from URL

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${username}`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };
        fetchPosts();
    }, [username]);

    return (
        <div>
            <h2>{username}'s Blog</h2>
            {posts.map(post => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default UserBlog;
