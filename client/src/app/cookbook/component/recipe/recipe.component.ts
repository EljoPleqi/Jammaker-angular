import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Condiment,
  Recipe,
  RecipeData,
} from 'src/app/shared/interfaces/recipe.model';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart,
  faPenToSquare,
  faTrashCan,
  faHomeAlt as faHome,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { RecipeApiService } from './api/recipe-api.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { concatMap, first, forkJoin, Subscription } from 'rxjs';
import { Instruction } from 'src/app/shared/interfaces/instruction';
import { RecipeUpdateStateService } from './shared/services/recipe-update-state.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  // * icons
  faClock = faClock;
  faHeart = faHeart;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faHome = faHome;
  faSave = faSave;

  // * variables
  id: number = 0;
  userId: number | undefined;
  recipeType: string = '';

  toggleEdit: boolean = false;
  isLoading: boolean = true;

  recipe?: Recipe | Condiment;
  updatedRecipe?: Recipe | Condiment;
  recipeData!: RecipeData;

  userSubscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeApiService: RecipeApiService,
    private fetchUser: GetUserService,
    private recipeUpdateStateService: RecipeUpdateStateService
  ) {}

  ngOnInit(): void {
    // * get recipe id from the url params

    this.id = this.route.snapshot.params['id'];
    this.recipeType = this.route.snapshot.url[0].path;
    this.userSubscription = this.fetchUser.user$.subscribe(
      (user) => (this.userId = user?.id)
    );

    this.recipeApiService
      .fetchRecipe(this.id, this.recipeType)
      .subscribe((data) => {
        this.recipeData = {
          id: data.recipe.id,
          playlistId: data.playlist,
        };
        this.recipe = data.recipe || {};
        this.updatedRecipe = { ...this.recipe } || {};
        this.isLoading = false;
      });
  }

  onAddToFavorites() {
    if (!this.recipe) {
      console.error('No Recipe');
      return;
    }
    this.recipeApiService
      .makeFavourite(this.recipe.id, this.recipe.favorite, this.recipeType)
      .subscribe((data) => {
        this.recipe ? (this.recipe.favorite = data) : false;
      });
  }
  onDeleteRecipe() {
    if (!this.recipe) {
      return;
    }
    this.recipeApiService
      .deleteRecipe(this.recipe.id, this.recipeType!)
      .subscribe((_) => {
        this.router.navigate(['/cookbook', `${this.userId}`]);
      });
  }
  onToggleEdit() {
    this.toggleEdit = !this.toggleEdit;
  }

  onUpdatingRecipe() {
    this.recipeUpdateStateService.triggerGatherData().subscribe();
    this.triggerUpdatinRecipe();
    this.toggleEdit = !this.toggleEdit;
  }

  private triggerUpdatinRecipe() {
    this.recipeUpdateStateService.newInstructions$
      .pipe(first())
      .subscribe((newInstructions) => {
        if (this.updatedRecipe)
          this.updatedRecipe.instructions = newInstructions;
      });

    this.recipeUpdateStateService.newIngredients$
      .pipe(first())
      .subscribe((newIngredients) => {
        if (this.updatedRecipe) this.updatedRecipe.ingredients = newIngredients;
      });

    this.recipeApiService
      .editRecipe(this.updatedRecipe, this.recipeType)
      .subscribe();
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
