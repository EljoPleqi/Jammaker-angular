import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class PostUserTypedRecipeService {
  constructor(private http: HttpClient) {}

  PostUserRecipe(recipe: Recipe) {
    console.log(recipe);
    return this.http.post('http:/localhost:3000/api/v1/user-recipes', recipe, {
      withCredentials: true,
    });
  }
}
