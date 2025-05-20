const mongoose = require('mongoose');

const SavedRecipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true,
    },
    savedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, 
});

SavedRecipeSchema.index({ user: 1, recipe: 1 }, { unique: true }); // to ensure unique user recipe pairs (user cannot save same recipe more than once)

const SavedRecipe = mongoose.model('SavedRecipe', SavedRecipeSchema);
module.exports = SavedRecipe;