const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        trim: true,
        maxLength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
    unique: ['user', 'recipe'] // so that a user can only review a recipe once
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;