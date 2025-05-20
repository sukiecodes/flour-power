require('dotenv').config(); // loads variables from .env file to process.env

const express = require('express'); // imports the express lib

const app = express(); // creating an instance of express lib

const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json()); // middleware to parse incoming JSON data in request bodies
const cors = require('cors');
app.use(cors()) // middleware for enabling CORS (cross-original resource sharing)

// ROUTES
const authRoutes = require('./routes/authRoutes'); // imports authRoutes
const recipeRoutes = require('./routes/recipeRoutes');
const savedRecipeRoutes = require('./routes/savedRecipeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/auth', authRoutes); // mount the authRoutes under the '/api/auth' path
app.use('/api/recipes', recipeRoutes); // mount the recipeRoutes under the '/api/recipes' path
app.use('/api/saved-recipes', savedRecipeRoutes); // mount the savedRecipeRoutes under the '/api/saved-recipes' path
app.use('/api/recipes/:recipeId/reviews', reviewRoutes); // for adding or fetching reviews
app.use('/api/reviews', reviewRoutes); // for deleting a review based on its specific id, not recipeId

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });