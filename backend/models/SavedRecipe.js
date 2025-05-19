const mongoose = require('mongoose');

const SavedRecipeSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true,
    },
    savedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, 
    unique: ['user', 'recipe'], 
});

const SavedRecipe = mongoose.model('SavedRecipe', SavedRecipeSchema);
module.exports = SavedRecipe;