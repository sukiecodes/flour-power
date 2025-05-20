const express = require('express');
const router = express.Router();
const savedRecipeController = require('../controllers/savedRecipeController');
const authMiddleware = require('../middleware/authMiddleware'); 

// route for saving a recipe
router.post('/', authMiddleware, savedRecipeController.saveRecipe);

// route for unsaving a recipe
router.delete('/:id', authMiddleware, savedRecipeController.unsaveRecipe);

// route for getting all the saved recipes of a specific user
router.get('/', authMiddleware, savedRecipeController.getSavedRecipes);

module.exports = router;