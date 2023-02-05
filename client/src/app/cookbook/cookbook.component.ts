import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../shared/interfaces/user';
import { GetUserService } from '../shared/services/get-user.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss'],
})
export class CookbookComponent implements OnInit {
  userId: string | null = '';
  loading: boolean = true;
  user$: Observable<UserResponse> | undefined;
  spinner: boolean = false;
  constructor(private fetchUser: GetUserService) {
    this.userId = location.pathname.split('/')[2];
  }

  ngOnInit(): void {
    this.user$ = this.fetchUser.fetchUser(this.userId);
    this.loading = false;
  }

  loadSpinner(event: boolean) {
    this.spinner = event;
  }
}
