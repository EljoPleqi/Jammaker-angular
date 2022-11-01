import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, of } from 'rxjs';
import {
  NewCondimentData,
  NewRecipeData,
  Recipe,
} from '../../../shared/interfaces/recipe.model';
import { RecipeData } from '../../../shared/interfaces/recipe.model';
@Injectable({
  providedIn: 'root',
})
export class PostUserTypedRecipeService {
  constructor(private http: HttpClient) {}

  private PostUserMealRecipe(data: NewRecipeData | NewCondimentData) {
    return this.http.post<RecipeData>(
      'http://localhost:3000/api/v1/typed-recipe',
      { data: data },
      {
        withCredentials: true,
      }
    );
  }

  private PostUserCondimentRecipe(data: NewRecipeData | NewCondimentData) {
    return this.http.post<RecipeData>(
      'http://localhost:3000/api/v1/condiments',
      { data: data },
      {
        withCredentials: true,
      }
    );
  }

  PostUserRecipe(
    recipeData: NewRecipeData | NewCondimentData,
    toggleForm: boolean
  ) {
    return iif(
      () => toggleForm,
      this.PostUserMealRecipe(recipeData),
      this.PostUserCondimentRecipe(recipeData)
    );
  }
}
