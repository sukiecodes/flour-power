'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import RecipeForm from '@/components/recipe/RecipeForm';
import { RecipeFormData } from '@/lib/types';

// page where user can create a new recipe, in theory will direct them their my-recipes page afterward
// uses RecipeForm from components
export function CreateRecipePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleCreateRecipe = async (formData: RecipeFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            if (!backendUrl) {
                throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined in environment variables');
            }
            
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                throw new Error('no authentication token found, please log in');
            }

            const response = await fetch(`${backendUrl}/recipes`, { // POST to /api/recipes
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData), // send entire form data object
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'failed to create recipe');
            }

            alert('recipe created successfully!');
            router.push(`/my-recipes`); // eventually redirect to user's recipes or the new recipe's detail page

        } catch (error: any) {
            console.error('Create recipe error:', error);
            setError(error.message || 'an error occurred while creating the recipe');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <RecipeForm
                onSubmit={handleCreateRecipe}
                isLoading={isLoading}
                error={error}
                // no initial data because creating new recipe
            />
        </div>
    )
}