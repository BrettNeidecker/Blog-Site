const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        // Create a new post with the logged-in user's ID as the author
        const newPost = new Post({
            title,
            content,
            author: req.userId // req.userId is set by auth middleware
        });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all posts for a specific user
exports.getPosts = async (req, res) => {
    try {
        // Find the user by username from the URL parameters
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Fetch posts by the user, sorted by creation date in descending order
        const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    const { title, content } = req.body;
    try {
        // Find the post by ID and ensure the logged-in user is the author
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        // Check if the logged-in user is the author of the post
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to edit this post' });
        }

        // Update the post's title and content
        post.title = title;
        post.content = content;
        await post.save();
        res.json({ message: 'Post updated successfully', post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        // Find the post by ID and ensure the logged-in user is the author
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        // Check if the logged-in user is the author of the post
        if (post.author.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        // Delete the post
        await post.remove();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
