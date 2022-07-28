import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { UserResponse } from '../interfaces/user_response';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  user!: User;
  constructor(private http: HttpClient) {}

  fetchUser(id: string | null) {
    return this.http.get<UserResponse>(`http://localhost:3000/sessions/${id}`, {
      withCredentials: true,
    });
  }
}
