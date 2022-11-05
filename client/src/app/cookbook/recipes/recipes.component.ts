import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription, switchMap } from 'rxjs';
import { Condiment, Recipe } from 'src/app/shared/interfaces/recipe.model';
import { User } from 'src/app/shared/interfaces/user';
import { DiplayFavoritesService } from 'src/app/shared/services/diplay-favorites.service';
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
  showFavotires: boolean = false;

  userObjectSubscription = new Subscription();
  recipesSubscription = new Subscription();
  condimentsSubscription = new Subscription();
  favoritesSubscription = new Subscription();

  constructor(
    private fetchUser: GetUserService,
    private displayFavoritesServices: DiplayFavoritesService
  ) {}

  ngOnInit(): void {
    this.userObjectSubscription = this.fetchUser.userObject$.subscribe(
      (data) => {
        this.user = data?.user;
        this.meals = data?.recipes;
        this.condiments = data?.condiments;
        this.recipes = [...(this.meals as []), ...(this.condiments as [])];
      }
    );
    this.favoritesSubscription =
      this.displayFavoritesServices.favorites$.subscribe(
        (data) => (this.showFavotires = data)
      );
  }
  ngOnDestroy() {
    this.userObjectSubscription.unsubscribe();
    this.favoritesSubscription.unsubscribe();
  }
}
