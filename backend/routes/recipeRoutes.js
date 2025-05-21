const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware'); // importing auth middleware

// route for getting all recipes (public viewing so no need for auth)
router.get('/', recipeController.getAllRecipes);

// route for getting all recipes that a user has created
router.get('/my-recipes', authMiddleware, recipeController.getRecipesOfUser);

// route to get single recipe by id
router.get('/:id', recipeController.getRecipeById);

// route for adding a recipe
router.post('/', authMiddleware, recipeController.addRecipe);

// route for updating a recipe
router.put('/:id', authMiddleware, recipeController.updateRecipe);

// route for deleting a recipe
router.delete('/:id', authMiddleware, recipeController.deleteRecipe);

module.exports = router;