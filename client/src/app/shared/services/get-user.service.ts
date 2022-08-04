import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Recipe } from '../interfaces/recipe';
import { UserResponse } from '../interfaces/user_response';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  user!: User;
  recipes!: Recipe[];
  constructor(private http: HttpClient) {}

  fetchUser(id: string | null) {
    return this.http.get<UserResponse>(`http://localhost:3000/sessions/${id}`, {
      withCredentials: true,
    });
  }
}
