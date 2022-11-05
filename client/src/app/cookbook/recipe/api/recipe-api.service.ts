import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iif } from 'rxjs';
import {
  NewCondimentData,
  NewRecipeData,
  RecipeData,
  RecipeResponse,
} from 'src/app/shared/interfaces/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  constructor(private http: HttpClient) {}

  fetchRecipe(id: number, type: string) {
    return this.http.get<RecipeResponse>(
      `http://localhost:3000/api/v1/${type}/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  postUserRecipe(data: NewRecipeData | NewCondimentData, toggleForm: boolean) {
    return this.http.post<RecipeData>(
      `http://localhost:3000/api/v1/${
        toggleForm ? 'typed-recipe' : 'condiments'
      }`,
      { data: data },
      {
        withCredentials: true,
      }
    );
  }

  editRecipe(recipeId: number) {
    return this.http.put('url', {}, { withCredentials: true });
  }

  deleteRecipe(recipeId: number, recipeType: string) {
    return this.http.delete(
      `http://localhost:3000/api/v1/${
        recipeType === 'recipes' ? recipeType : 'condiments'
      }/${recipeId}`,
      { withCredentials: true }
    );
  }

  makeFavourite(recipeId: number, state: boolean, recipeType: string) {
    return this.http.patch<boolean>(
      `http://localhost:3000/api/v1/${
        recipeType === 'recipes' ? recipeType : 'condiments'
      }/${recipeId}`,
      { state },
      { withCredentials: true }
    );
  }
}
