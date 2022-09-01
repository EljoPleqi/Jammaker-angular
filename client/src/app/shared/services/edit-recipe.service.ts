import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditRecipeService {

  constructor(private http: HttpClient) { }

  makeFavourite(recipeId: number) {
    return this.http.patch('url',{},{withCredentials:true})
  }

  editRecipe(recipeId: number) {
    return this.http.put('url', {}, { withCredentials: true });
  }
}
