const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// route for adding a review
router.post('/', authMiddleware, reviewController.addReview);

// route for deleting a review
router.delete('/:id', authMiddleware, reviewController.deleteReview);

// route for fetching reviews for a recipe
router.get('/', reviewController.getReviewsForRecipe);

module.exports = router;