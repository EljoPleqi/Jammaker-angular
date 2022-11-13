import { Ingredient } from './ingredients';
import { Instruction } from './instruction';

export interface Recipe {
  id: number;
  title: string;
  preptime: string;
  instructions: Instruction[];
  url?: string;
  ingredients: Ingredient[];
  favorite: boolean;
  category: string;
  genre: string;
}
export interface Condiment {
  id: number;
  title: string;
  url?: string;
  favorite: boolean;
  category: string;
  instructions: Instruction[];
  ingredients: Ingredient[];
  ingredientsArray?: string[];
  instructionsArray?: string[];
}
export interface NewRecipeData {
  title: string | null;
  prepTime: string | null;
  image?: string | null;
  servings: number | null;
  instructions: string | null;
  ingredients: string | null;
  favorite: boolean | null;
  category: string | null;
  genre: string | null;
  tags?: string | null;
}
export interface NewCondimentData {
  title: string | null;
  favorite: boolean | null;
  image: string | null;
  category?: string;
  instructions: string | null;
  ingredients: string | null;
}
export interface RecipeScrapped {
  genre: string;
  url: string;
}

export interface RecipeResponse {
  recipe: Recipe | Condiment;
  playlist?: string;
}

export interface RecipeData {
  id: number;
  playlistId?: string;
}
