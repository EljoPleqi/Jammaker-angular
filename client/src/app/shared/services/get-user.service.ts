import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Condiment, Recipe } from '../interfaces/recipe.model';
import { UserResponse } from '../interfaces/user';
import { BehaviorSubject, EMPTY, empty, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  userSubject = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.userSubject.asObservable();
  userRecipesSubject = new BehaviorSubject<Recipe[] | undefined>(undefined);
  userRecipes$ = this.userRecipesSubject.asObservable();
  userCondimentsSubject = new BehaviorSubject<Condiment[] | undefined>(
    undefined
  );
  userCondiments$ = this.userCondimentsSubject.asObservable();

  userObjectSubject = new BehaviorSubject<UserResponse | undefined>(undefined);
  userObject$ = this.userObjectSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchUser(id: string | null) {
    return this.http
      .get<UserResponse>(`http://localhost:3000/sessions/${id}`, {
        withCredentials: true,
      })
      .pipe(
        map((userResponse) => {
          this.userObjectSubject.next(userResponse);
          this.userSubject.next(userResponse.user);
          return userResponse;
        })
      );
  }
}
