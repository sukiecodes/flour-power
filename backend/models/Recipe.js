const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200
    },
    description: {
        type: String,
        trim: true
    },
    ingredients: [{ // array of string ingredients
        type: String,
        required: true,
        trim: true
    }],
    instructions: [{
        type: String,
        required: true,
        trim: true
    }],
    image: { // URL to image
        type: String,
        trim: true
    },
    owner: { // references the user that created the recipe
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        trim: true
    },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;