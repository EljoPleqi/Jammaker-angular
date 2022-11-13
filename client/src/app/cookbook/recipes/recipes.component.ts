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
  favoriteMeals: Recipe[] = [];

  condiments: Condiment[] | undefined;
  favoriteCondiments: Condiment[] = [];

  recipes: (Recipe | Condiment)[] = [];
  favoriteRecipes!: (Recipe | Condiment)[];

  displayType: string = 'All Recipes';
  options: string[] = ['All Recipes', 'All Meals', 'All Condiments'];
  showFavorites: boolean = false;

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
      this.displayFavoritesServices.favorites$.subscribe((data) => {
        this.showFavorites = data;
        if (this.showFavorites) {
          this.favoriteRecipes = this.filterRecipes(this.recipes);
          this.filterMeals(this.favoriteRecipes);
        }
      });
  }

  ngOnDestroy() {
    this.userObjectSubscription.unsubscribe();
    this.favoritesSubscription.unsubscribe();
  }

  private filterRecipes = (recipes: (Recipe | Condiment)[]) =>
    recipes.filter((recipe) => (recipe.favorite ? recipe : null));

  private filterMeals = (recipes: (Recipe | Condiment)[]) =>
    recipes.forEach((recipe) =>
      this.isRecipe(recipe)
        ? this.favoriteMeals.push(recipe)
        : this.favoriteCondiments.push(recipe)
    );

  private isRecipe(recipe: Recipe | Condiment): recipe is Recipe {
    return (<Recipe>recipe).genre !== undefined;
  }
}
