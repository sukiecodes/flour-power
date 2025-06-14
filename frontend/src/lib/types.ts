export interface Recipe {
    _id?: string; // present if existing recipe
    user?: string; // whoever creating recipe
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    image?: string;
    tags?: string[];
    category?: string;
    createdAt?: string;
    updatedAt?: string;
}

// recipe form data excludes possible backend retrieved data
export interface RecipeFormData {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    image?: string;
    category?: string;
    tags?: string[];
}