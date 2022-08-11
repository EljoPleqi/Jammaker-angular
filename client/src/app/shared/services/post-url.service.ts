import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeScrapped } from '../interfaces/recipe_scrapped';
import { RecipeData } from '../interfaces/recipe_data';

@Injectable({
  providedIn: 'root',
})
export class PostUrlService {
  constructor(private http: HttpClient) {}

  postUrl(recipeData: RecipeScrapped) {
    return this.http.post<RecipeData>(
      'http://localhost:3000/api/v1/recipes',
      { recipeData },
      { withCredentials: true }
    );
  }
}
