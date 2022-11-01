import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditRecipeService {

  constructor(private http: HttpClient) { }

  makeFavourite(recipeId: number, state: boolean) {
    return this.http.patch<boolean>(
      `http://localhost:3000/api/v1/recipes/${recipeId}`,
      { state },
      { withCredentials: true }
    );
  }

  editRecipe(recipeId: number) {
    return this.http.put('url', {}, { withCredentials: true });
  }

  deleteRecipe(recipeId: number) {
    return this.http.delete( `http://localhost:3000/api/v1/recipes/${recipeId}`, {withCredentials:true})
  }
}
