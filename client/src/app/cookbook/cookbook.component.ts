import { Component, OnInit } from '@angular/core';
import { User } from '../shared/interfaces/user';
import { Recipe } from '../shared/interfaces/recipe';
import { GetUserService } from '../shared/services/get-user.service';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css'],
})
export class CookbookComponent implements OnInit {
  spinner: boolean = false;
  userId: string | null = '';
  user!: User;
  recipes!: Recipe[];
  loading: boolean = true;

  constructor(private loggedUser: GetUserService) {
    this.userId = location.pathname.split('/')[2];
  }

  ngOnInit(): void {
    this.loggedUser.fetchUser(this.userId).subscribe((data) => {
      this.loggedUser.user = data.user;
      this.loggedUser.recipes = data.recipes;
      this.loading = false;
    });
  }

  loadSpinner(event: boolean) {
    this.spinner = event;
  }
}
