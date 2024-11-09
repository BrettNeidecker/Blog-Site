const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        mongoose.connection.close(); // Close connection after successful test
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        mongoose.connection.close(); // Close connection after error
    });

