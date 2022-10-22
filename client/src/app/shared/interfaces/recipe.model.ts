import { Ingredients } from './ingredients';
import { Instruction } from './instruction';

export interface Recipe {
  id: number;
  title: string;
  preptime: string;
  instructions: Instruction[];
  url?: string;
  ingredients: Ingredients[];
  ingredientsArray?: string[];
  instructionsArray?: string[];
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
export interface RecipeScrapped {
  genre: string;
  url: string;
}

export interface RecipeResponse {
  recipe: Recipe
  playlist: string;
}

export interface RecipeData {
  id: number;
  playlistId: string;
}
