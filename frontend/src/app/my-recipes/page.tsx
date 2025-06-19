'use client';

import React from 'react'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyRecipesPage() {
    const fetchRecipesForUser = async () => {
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            if (!backendUrl) {
                throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined in environment variables');
            }
    
            const response = await fetch(`${backendUrl}/recipes/my-recipes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const data = await response.json();
        } catch (error: any) {
            console.error('fetching recipes error: ', error)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <Link href="/create-recipe" passHref legacyBehavior>
                    <a className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 font-semibold">
                        + Add New Recipe
                    </a>
            </Link>


            <h1 className="text-3xl font-bold mb-4">My Recipes</h1>
            <p>This is where your created recipes will be displayed</p>
        </div>
    );
}