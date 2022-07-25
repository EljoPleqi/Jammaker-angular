import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  user!: User
  constructor(private http: HttpClient) {

  }

  fetchUser(id:string | null) {
    return this.http.get<User>(`http://localhost:3000/sessions/${id}`,{ withCredentials: true})
  }


}
