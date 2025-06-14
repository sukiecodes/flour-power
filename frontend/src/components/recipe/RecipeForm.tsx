'use client';

import React from 'react';
import { Recipe, RecipeFormData } from '@/lib/types';

// need to think about whether it is an existing recipe to edit or new recipe?
interface RecipeFormProps {
    initialData?: Recipe;
    onSubmit: (formData: RecipeFormData) => void;
    isLoading: boolean;
    error: string | null;
}

export default function RecipeForm({ initialData, onSubmit, isLoading, error }: RecipeFormProps) {
    const isEditing = !!initialData;

    const [title, setTitle] = React.useState(initialData?.title || '');
    const [description, setDescription] = React.useState(initialData?.description || '');
    const [ingredients, setIngredients] = React.useState<string[]>(initialData?.ingredients || ['']);
    const [instructions, setInstructions] = React.useState<string[]>(initialData?.instructions || ['']);
    const [image, setImage] = React.useState(initialData?.image || '')
    const [category, setCategory] = React.useState(initialData?.category || '')
    const [tags, setTags] = React.useState<string[]>(initialData?.tags || [''])
    
    const addArrayInput = (type: 'ingredients' | 'instructions' | 'tags') => {
        if (type == 'ingredients') {
            setIngredients([...ingredients, '']);
        } else if (type == 'instructions') {
            setInstructions([...instructions, '']);
        } else if (type == 'tags') {
            setTags([...tags, '']);
        }
    };

    const removeArrayInput = (index: number, type: 'ingredients' | 'instructions' | 'tags') => {
        if (type == 'ingredients') {
            setIngredients(ingredients.filter((_, i) => i !== index));
        } else if (type == 'instructions') {
            setInstructions(instructions.filter((_, i) => i !== index));
        } else if (type == 'tags') {
            setTags(tags.filter((_, i) => i !== index));
        }
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // validating the required fields
        if (!title.trim() || !description.trim() || !ingredients.some(ing => !ing.trim()) || !instructions.some(inst => !inst.trim())) {
            alert('Please fill in all required fields: Title, Description, Ingredients, and Instructions')
            return;
        }

        const formData: RecipeFormData = {
            title: title.trim(),
            description: description.trim(),
            ingredients: ingredients.filter(ing => ing.trim() !== ''),
            instructions: instructions.filter(inst => inst.trim() !== ''),
            image: image.trim() || undefined,
            category: category.trim() || undefined,
            tags: tags.filter(tag => tag.trim() !== '') || undefined,
        };

        onSubmit(formData); // call onSubmit prop with collected or modified data
    };

    return (
        <form onSubmit={handleSubmit} className="">
            <h2>
                {isEditing? 'Edit Recipe' : 'Create New Recipe'}
            </h2>

            {error && (
                <p>{error}</p>
            )}
            
            {/* title */}
            <div>
                <label> Title </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            
            {/* description */}
            <div>
                <label> Description </label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            {/* ingredients */}
            <div>
                <label> Ingredients </label>
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={ingredient}
                            onChange={(e) => e.target.value}
                            placeholder={`Ingredient ${index + 1}`}
                            required
                        />
                        {ingredients.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeArrayInput(index, 'ingredients')}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayInput('ingredients')}
                >
                    Add Ingredient
                    </button>
            </div>
            

            {/* instructions */}
            <div>
                <label> Instructions </label>
                {instructions.map((instruction, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={instruction}
                            onChange={(e) => e.target.value}
                            placeholder={`Instruction ${index + 1}`}
                            required
                        />
                        {instructions.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeArrayInput(index, 'instructions')}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayInput('instructions')}
                >
                    Add Instruction
                    </button>
            </div>
            
            {/* optional image url */}
            <div>
                <label htmlFor="image"> Image *Optional* </label>
                <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>

            {/* optional category */}
            <div>
                <label htmlFor="category"> Category *Optional* </label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
                            
            {/* optional tags */}
            <div>
                <label> Tags *Optional* </label>
                {tags.map((tag, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={tag}
                            onChange={(e) => e.target.value}
                            placeholder={`Tag ${index + 1}`}
                        />
                        {tags.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeArrayInput(index, 'tags')}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayInput('tags')}
                >
                    Add Tag
                    </button>
            </div>
            
            {/* submit button */}
            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
                </button>
            </div>

        </form>
    )
}