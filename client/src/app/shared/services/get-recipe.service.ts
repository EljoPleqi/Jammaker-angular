import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeResponse } from '../interfaces/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class GetRecipeService {
  constructor(private http: HttpClient) {}

  fetchRecipe(id: number) {
    return this.http.get<RecipeResponse>(
      `http://localhost:3000/api/v1/recipes/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
