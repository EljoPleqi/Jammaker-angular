import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/shared/interfaces/recipe.model';
import { User } from 'src/app/shared/interfaces/user';
import { GetUserService } from 'src/app/shared/services/get-user.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  user: User | undefined;
  recipes: Recipe[] | undefined;

  userSubscription = new Subscription();
  recipesSubscription = new Subscription();
  constructor(private fetchUser: GetUserService) {}

  ngOnInit(): void {
    this.userSubscription = this.fetchUser.user$.subscribe((user) => {
      this.user = user;
    });
    this.recipesSubscription = this.fetchUser.userRecipes$.subscribe(
      (recipes) => (this.recipes = recipes)
    );
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.recipesSubscription.unsubscribe();
  }
}
