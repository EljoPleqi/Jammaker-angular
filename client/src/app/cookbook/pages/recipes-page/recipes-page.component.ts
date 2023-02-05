import { Component, OnDestroy, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { Condiment, Recipe } from 'src/app/shared/interfaces/recipe.model';
import { User, UserResponse } from 'src/app/shared/interfaces/user';
import { GetUserService } from 'src/app/shared/services/get-user.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss'],
})
export class RecipesPageComponent implements OnInit {
  userResponse$?: Observable<UserResponse | undefined>;
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

  constructor(private fetchUser: GetUserService) {}

  ngOnInit(): void {
    this.userResponse$ = this.fetchUser.userObject$;
  }

  displayFavorites() {
    this.showFavorites = !this.showFavorites;
  }

  getUserRecipes = (meals: Recipe[], condiments: Condiment[]): (Recipe | Condiment)[] => [...(meals as []), ...(condiments as [])];

  filterRecipes = (recipes: (Recipe | Condiment)[]) => recipes.filter((recipe) => (recipe.favorite ? recipe : null));
}
