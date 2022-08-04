import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class GetRecipeService {
  constructor(private http: HttpClient) {}

  fetchRecipe(id: number) {
    return this.http.get<Recipe>(`http://localhost:3000/api/v1/recipes/${id}`, {
      withCredentials: true,
    });
  }
}
