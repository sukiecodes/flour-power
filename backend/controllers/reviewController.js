const Review = require('../models/Review');
const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

// add review function
const addReview = async (req, res) => {
    const { recipeId } = req.params;
    const { rating, comment } = req.body 
    const userId = req.user.userId; // from auth middleware 

    try {
        const recipeExists = await Recipe.findById(recipeId);
        if (!recipeExists) {
            return res.status(404).json({ message: 'recipe not found' });
        }

        const newReview = new Review({
            user: userId,
            recipe: recipeId,
            rating,
            comment,
        });

        await newReview.save();

        res.status(201).json({ message: 'review added successfully ', review: newReview });
    } catch (error) {
        console.error('error while adding review: ', error);
        res.status(500).json({ message: 'adding review failed', error: error.message });
    }
};

// function for deleting a review
const deleteReview = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        // attempting to find and delete the review
        const deletedReview = await Review.findOneAndDelete({ _id: id, user: userId });

        if (!deletedReview) {
            return res.status(404).json({ message: 'review not found or unauthorized to delete' });
        }

        res.status(200).json({ message: 'review deleted successfully', deletedReview });
    } catch (error) {
        console.error('error deleting review: ', error);
        res.status(409).json({ message: 'failed to delete review: ', error: error.message});
    }
};

// fetching all reviews for a recipe function
const getReviewsForRecipe = async (req, res) => {
    const { recipeId } = req.params;

    let objectIdRecipeId;
    try {
        objectIdRecipeId = new mongoose.Types.ObjectId(recipeId); // trying to convert string id to object id
    } catch (error) {
        console.error('invalid recipeId format:', recipeId);
        return res.status(400).json({ message: 'invalid recipeId format' });
    }

    try {
        const recipeExists = await Recipe.findById(objectIdRecipeId);
        if (!recipeExists) {
            return res.status(404).json({ message: 'recipe not found' });
        }

        const reviews = await Review.find({ recipe: objectIdRecipeId }).populate('user', 'username email');
        res.status(200).json({ reviews });
    } catch (error) {
        console.error('error fetching reviews:', error);
        res.status(500).json({ message: 'failed to fetch reviews', error: error.message });
    }
}

module.exports = {
    addReview,
    deleteReview,
    getReviewsForRecipe,
};

