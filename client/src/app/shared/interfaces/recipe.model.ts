import { Ingredients } from './ingredients';
import { Instruction } from './instruction';

export interface Recipe {
  id: number;
  title: string;
  preptime: string;
  instructions: Instruction[];
  url?: string;
  ingredients: Ingredients[];
  favorite: boolean;
  category: string;
  genre: string;
}
export interface Condiment {
  id: number;
  title: string;
  url?: string;
  favorite: boolean;
  instructions: Instruction[];
  ingredients: Ingredients[];
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
