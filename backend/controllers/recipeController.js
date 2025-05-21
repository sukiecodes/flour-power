const Recipe = require('../models/Recipe');

// function that adds a recipe
const addRecipe = async (req, res) => {
    const { title, description, ingredients, instructions, image, tags, category } = req.body;
    const user = req.user.userId;

    // basic validation for required fields before proceeding
    if (!title || !description || !ingredients || !instructions || !user) {
        return res.status(400).json({ message: 'please include all required recipe fields: title, description, ingredients, instructions, and ensure you are logged in.' });
    }

    try {
        const newRecipe = new Recipe({
            title,
            description,
            ingredients,
            instructions,
            image,
            user,
            tags,
            category,
        });

        await newRecipe.save();

        res.status(201).json({ message: 'recipe added successfully', recipe: newRecipe });
    } catch (error) {
        console.error('error while adding recipe: ', error);
        res.status(500).json({ message: 'adding recipe failed', error: error.message });
    }
};

// function to get all recipes that a specific user has created
const getRecipesOfUser = async (req, res) => {
    const userId = req.user.userId; // from auth middleware 

    try {
        const recipes = await Recipe.find({ user: userId }).populate('user', 'username email');

        if (!recipes || recipes.length === 0) {
            return res.status(200).json({ message: 'no recipes created yet', recipes: [] });
        }

        res.status(200).json({ recipes });
    } catch (error) {
        console.error('error fetching recipes for user: ', error);
        res.status(500).json({ message: 'failed to fetch recipes for user ', error: error.message });
    }
};

// function to update recipe
const updateRecipe = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;
    const updateData = req.body;

    try {
        // change string id to object id 
        let objectIdRecipeId;
        try {
            objectIdRecipeId = new mongoose.Types.ObjectId(id);
        } catch (error) {
            return res.status(400).json({ message: 'invalid recipeId format' });
        }

        // find and update the recipe, ensuring ownership
        const updatedRecipe = await Recipe.findOneAndUpdate(
            { _id: objectIdRecipeId, user: userId },
            updateData, // data to update
            { new: true, runValidators: true } 
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'recipe not found or unauthorized to update' });
        }

        res.status(200).json({ message: 'recipe updated successfully: ', recipe: updatedRecipe });

    } catch (error) {
        console.error('error while updating recipe: ', error);
        res.status(500).json({ message: 'updating recipe failed: ', error: error.message });
    }
};

// function to delete recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const deletedRecipe = await Recipe.findOneAndDelete({ _id: id, user: userId });

        if (!deletedRecipe) {
            return res.status(404).json({ message: 'recipe not found or unauthorized to delete' });
        }

        res.status(200).json({ message: 'recipe deleted successfully', deletedRecipe });
    } catch (error) {
        console.error('error deleting recipe: ', error);
        res.status(409).json({ message: 'failed to delete recipe: ', error: error.message});
    }
};

module.exports = {
    addRecipe,
    getRecipesOfUser,
    updateRecipe,
    deleteRecipe,
};