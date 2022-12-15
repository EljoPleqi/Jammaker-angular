import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../shared/interfaces/user';
import { Condiment, Recipe } from '../shared/interfaces/recipe.model';
import { GetUserService } from '../shared/services/get-user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss'],
})
export class CookbookComponent implements OnInit, OnDestroy {
  spinner: boolean = false;
  userId: string | null = '';
  user: User | undefined;
  recipes: Recipe[] | undefined;
  condiments: Condiment[] | undefined;
  loading: boolean = true;
  userTyped: boolean = false;
  typedSub!: Subscription;

  constructor(private fetchUser: GetUserService) {
    this.userId = location.pathname.split('/')[2];
  }

  ngOnInit(): void {
    this.fetchUser.fetchUser(this.userId).subscribe((data) => {
      this.user = data.user;
      this.recipes = data.recipes;
      this.condiments = data.condiments;
    });
    this.loading = false;
  }

  ngOnDestroy() {
    // this.userSubscription.unsubscribe();
    // this.recipesSubscription.unsubscribe();
  }

  loadSpinner(event: boolean) {
    this.spinner = event;
  }
}
