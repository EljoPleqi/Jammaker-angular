import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, of } from 'rxjs';
import { Recipe } from '../interfaces/recipe.model';
import { RecipeData } from '../interfaces/recipe.model';
@Injectable({
  providedIn: 'root',
})
export class PostUserTypedRecipeService {
  constructor(private http: HttpClient) {}

  PostUserMealRecipe(recipeData: Recipe) {
    return this.http.post<RecipeData>(
      'http://localhost:3000/api/v1/typed-recipe',
      { recipeData },
      {
        withCredentials: true,
      }
    );
  }

  PostUserCondimentRecipe(recipeData: Recipe) {
    return this.http.post<RecipeData>(
      'http://localhost:3000/api/v1/condiments',
      { recipeData },
      {
        withCredentials: true,
      }
    );
  }

  PostUserRecipe(recipeData: Recipe, toggleForm:boolean) {
    return iif(()=>toggleForm, this.PostUserCondimentRecipe(recipeData), this.PostUserCondimentRecipe(recipeData) )
  }
}
