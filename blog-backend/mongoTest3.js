const mongoose = require('mongoose');

const uri = "mongodb+srv://bneidecker:24HPsIeawyEIzIHA@cluster0.wbu3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
        mongoose.connection.close(); // Close connection after successful test
    })
    .catch(err => {
        console.error("Error connecting to MongoDB Atlas:", err);
        mongoose.connection.close(); // Close connection after error
    });

