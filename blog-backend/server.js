require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const cors = require('cors'); //Import cors

const app = express();
app.use(express.json()); // Middleware to parse JSON

//Allow requests from specific origins
app.use(cors({
	origin: ['https://api.linguica.org', 'https://linguica.org', 'localhost:3000'],  // Frontend URLs
    methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
    credentials: true,              // Enable if you need to include cookies
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Database connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

//for testing
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
