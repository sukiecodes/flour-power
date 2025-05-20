const SavedRecipe = require('../models/SavedRecipe');
const Recipe = require('../models/Recipe');

// function that saves recipe
const saveRecipe = async (req, res) => {
    const { recipeId } = req.body // the user will come from the authmiddleware because they have to be logged in already
    const userId = req.user.userId;

    try {
        // seeing if the recipe exists
        const recipeExists = await Recipe.findById(recipeId);
        if (!recipeExists) {
            return res.status(404).json({ message: 'recipe not found' });
        }
        
        // ensuring no duplicate saves
        const existingSavedRecipe = await SavedRecipe.findOne({ user: userId, recipe: recipeId });
        if (existingSavedRecipe) {
            return res.status(409).json({ message: 'recipe already saved by this user' });
        }

        const newSave = new SavedRecipe({
            user: userId,
            recipe: recipeId,
        });

        await newSave.save();

        res.status(200).json({ message: 'recipe saved successfully', newSave});
    } catch (error) {
        console.error('error while saving recipe: ', error);
        res.status(500).json({ message: 'saving recipe failed', error: error.message });
    }
};
// function that unsaves a recipe
const unsaveRecipe = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        // find and delete the SavedRecipe and ensure the user actually did save the recipe
        const deletedSavedRecipe = await SavedRecipe.findOneAndDelete({ _id: id, user: userId });

        if (!deletedSavedRecipe) {
            return res.status(404).json({ message: 'saved recipe not found or unauthorized to delete' });
        }

        res.status(200).json({ message: 'recipe unsaved successfully', deletedSavedRecipe });
    } catch (error) {
        console.error('error unsaving recipe: ', error);
        res.status(500).json({ message: 'failed to unsave recipe', error: error.message });
    }
};

// fetches all saved recipes for user
const getSavedRecipes = async (req, res) => {
    const userId = req.user.userId;
    
    try {
        const savedRecipes = await SavedRecipe.find({ user: userId }).populate('recipe');
        res.status(200).json({ savedRecipes });
    } catch (error) {
        console.error('error fetching saved recipes: ', error);
        res.status(500).json({ message: 'failed to fetch saved recipes', error: error.message });
    }
}

module.exports = {
    saveRecipe,
    unsaveRecipe,
    getSavedRecipes,
};