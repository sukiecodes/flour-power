const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware'); // importing auth middleware

// route for adding a recipe
router.post('/', authMiddleware, recipeController.addRecipe);

module.exports = router;