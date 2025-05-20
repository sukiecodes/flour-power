const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// route for adding a recipe
router.post('/recipes', recipeController.addRecipe);

module.exports = router;