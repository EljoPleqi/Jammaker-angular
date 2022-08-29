import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeData } from '../interfaces/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class NewPlaylistService {

  constructor(private http: HttpClient) { }

  generate(recipeData:string) {
    return this.http.post<RecipeData>(
      `http://localhost:3000/api/v1/recipes/${recipeData}/new-playlist`,
      { recipeData },
      { withCredentials: true }
    );
  }
}
