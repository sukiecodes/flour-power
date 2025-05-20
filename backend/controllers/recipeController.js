const Recipe = require('../models/Recipe');

// function that adds a recipe
const addRecipe = async (req, res) => {
    const { title, description, ingredients, instructions, image, owner, tags, category } = req.body;

    try {
        const newRecipe = new Recipe({
            title,
            description,
            ingredients,
            instructions,
            image,
            owner,
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

module.exports = {
    addRecipe,
};