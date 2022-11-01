import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Recipe } from '../interfaces/recipe.model';
import { UserResponse } from '../interfaces/user_response';
import { BehaviorSubject, EMPTY, empty, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  userSubject = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.userSubject.asObservable();
  userRecipesSubject = new BehaviorSubject<Recipe[] | undefined>(undefined);
  userRecipes$ = this.userRecipesSubject.asObservable();
  recipes!: Recipe[];
  constructor(private http: HttpClient) {}

  fetchUser(id: string | null) {
    return this.http
      .get<UserResponse>(`http://localhost:3000/sessions/${id}`, {
        withCredentials: true,
      })
      .pipe(
        map((userResponse) => {
          this.userSubject.next(userResponse.user);
          this.userRecipesSubject.next(userResponse.recipes);
          return userResponse;
        })
      );
  }
}
