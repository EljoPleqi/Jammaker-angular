import { Component, OnDestroy, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { Condiment, Recipe } from 'src/app/shared/interfaces/recipe.model';
import { User } from 'src/app/shared/interfaces/user';
import { GetUserService } from 'src/app/shared/services/get-user.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss'],
})
export class RecipesPageComponent implements OnInit, OnDestroy {
  user: User | undefined;
  faHeart = faHeart;

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
  favoritesSubscription = new Subscription();

  constructor(private fetchUser: GetUserService) {}

  ngOnInit(): void {
    this.userObjectSubscription = this.fetchUser.userObject$.subscribe(
      (data) => {
        this.user = data?.user;
        this.meals = data?.recipes || [];
        this.condiments = data?.condiments || [];
        this.recipes = [...(this.meals as []), ...(this.condiments as [])];
        this.favoriteRecipes = this.filterRecipes(this.recipes);
        this.filterMeals(this.favoriteRecipes);
      }
    );
  }
  displayFavorites() {
    this.showFavorites = !this.showFavorites;
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
  ngOnDestroy() {
    this.userObjectSubscription.unsubscribe();
  }
}
