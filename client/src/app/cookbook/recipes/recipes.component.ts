import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Condiment, Recipe } from 'src/app/shared/interfaces/recipe.model';
import { User } from 'src/app/shared/interfaces/user';
import { GetUserService } from 'src/app/shared/services/get-user.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  user: User | undefined;
  meals: Recipe[] | undefined;
  condiments: Condiment[] | undefined;
  recipes!: (Recipe | Condiment)[];

  displayType: string = 'All Recipes';
  options: string[] = ['All Recipes', 'All Meals', 'All Condiments'];

  userSubscription = new Subscription();
  recipesSubscription = new Subscription();
  condimentsSubscription = new Subscription();

  constructor(private fetchUser: GetUserService) {}

  ngOnInit(): void {
    this.userSubscription = this.fetchUser.user$.subscribe((user) => {
      this.user = user;
    });
    this.recipesSubscription = this.fetchUser.userRecipes$.subscribe(
      (recipes) => {
        this.meals = recipes;
      }
    );
    this.condimentsSubscription = this.fetchUser.userCondiments$.subscribe(
      (condiments) => {
        this.condiments = condiments;
        this.recipes = [...(this.meals as []), ...(condiments as [])];
      }
    );
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.recipesSubscription.unsubscribe();
  }
}
