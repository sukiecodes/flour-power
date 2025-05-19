require('dotenv').config(); // loads variables from .env file to process.env

const express = require('express'); // imports the express lib

const app = express(); // creating an instance of express lib

const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json()); // middleware to parse incoming JSON data in request bodies
const cors = require('cors');
app.use(cors()) // middleware for enabling CORS (cross-original resource sharing)

// DATABASE CONNECTION
const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI;

const connectDatabase = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
        });
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection failed: ', error.message);
        process.exit(1);
    }
};

connectDatabase();

// routes will go here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });