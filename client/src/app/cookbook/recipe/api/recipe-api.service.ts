import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Condiment,
  NewCondimentData,
  NewRecipeData,
  Recipe,
  RecipeData,
  RecipeResponse,
} from 'src/app/shared/interfaces/recipe.model';
const BASE_URL = 'http://localhost:3000/api/v1';
@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  constructor(private http: HttpClient) {}

  fetchRecipe(id: number, type: string) {
    return this.http.get<RecipeResponse>(`${BASE_URL}/${type}/${id}`, {
      withCredentials: true,
    });
  }

  postUserRecipe(data: NewRecipeData | NewCondimentData, toggleForm: boolean) {
    return this.http.post<RecipeData>(
      `${BASE_URL}/${toggleForm ? 'typed-recipe' : 'condiments'}`,
      { data: data },
      {
        withCredentials: true,
      }
    );
  }

  editRecipe(recipe: (Recipe | Condiment) | undefined, recipeType: string) {
    return this.http.put<Recipe | Condiment>(
      `${BASE_URL}/${recipeType === 'recipes' ? recipeType : 'condiments'}/${
        recipe!.id
      }`,
      { data: recipe },
      { withCredentials: true }
    );
  }

  deleteRecipe(recipeId: number, recipeType: string) {
    return this.http.delete(
      `${BASE_URL}/${
        recipeType === 'recipes' ? recipeType : 'condiments'
      }/${recipeId}`,
      { withCredentials: true }
    );
  }

  makeFavourite(recipeId: number, state: boolean, recipeType: string) {
    return this.http.patch<boolean>(
      `${BASE_URL}/${
        recipeType === 'recipes' ? recipeType : 'condiments'
      }/${recipeId}/make-favorite`,
      { state },
      { withCredentials: true }
    );
  }
}
