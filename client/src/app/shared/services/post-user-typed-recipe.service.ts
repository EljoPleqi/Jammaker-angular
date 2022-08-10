import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { RecipeResponse } from '../interfaces/recipe_response';

@Injectable({
  providedIn: 'root',
})
export class PostUserTypedRecipeService {
  constructor(private http: HttpClient) {}

  PostUserRecipe(recipeData: Recipe) {
    console.log(recipeData);
    return this.http.post<RecipeResponse>(
      'http://localhost:3000/api/v1/typed-recipe',
      { recipeData },
      {
        withCredentials: true,
      }
    );
  }
}
