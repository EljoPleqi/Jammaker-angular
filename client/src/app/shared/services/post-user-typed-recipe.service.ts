import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { RecipeData } from '../interfaces/recipe_data';
@Injectable({
  providedIn: 'root',
})
export class PostUserTypedRecipeService {
  constructor(private http: HttpClient) {}

  PostUserRecipe(recipeData: Recipe) {
    console.log(recipeData);
    return this.http.post<RecipeData>(
      'http://localhost:3000/api/v1/typed-recipe',
      { recipeData },
      {
        withCredentials: true,
      }
    );
  }
}
