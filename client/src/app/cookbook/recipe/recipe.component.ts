import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Condiment,
  Recipe,
  RecipeData,
} from 'src/app/shared/interfaces/recipe.model';
import { GetRecipeService } from 'src/app/cookbook/recipe/api/get-recipe.service';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartSolid,
  faPenToSquare as faPenToSquareSolid,
  faTrashCan as faTrashCanSolid,
  faHomeAlt as faHomeSolid,
} from '@fortawesome/free-solid-svg-icons';
import { EditRecipeService } from 'src/app/cookbook/recipe/api/edit-recipe.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  // * icons
  faClock = faClock;
  faHeartSolid = faHeartSolid;
  faPenToSquareSolid = faPenToSquareSolid;
  faTrashCanSolid = faTrashCanSolid;
  faHomeSolid = faHomeSolid;
  // * variables
  id: number = 0;
  userId: number | undefined;
  recipeType: string | undefined;
  recipe!: Recipe | Condiment;
  loading: Boolean = true;
  recipeData!: RecipeData;
  userSubscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private editRecipe: EditRecipeService,
    private recipeService: GetRecipeService,
    private fetchUser: GetUserService
  ) {}

  ngOnInit(): void {
    // * get recipe id from the url params

    this.id = this.route.snapshot.params['id'];
    this.recipeType = this.route.snapshot.url[0].path;
    this.userSubscription = this.fetchUser.user$.subscribe(
      (user) => (this.userId = user?.id)
    );

    this.recipeService
      .fetchRecipe(this.id, this.recipeType)
      .subscribe((data) => {
        this.recipeData = {
          id: data.recipe.id,
          playlistId: data.playlist,
        };
        this.recipe = data.recipe;
        this.loading = false;
      });
  }

  onAddToFavorites() {
    this.editRecipe
      .makeFavourite(this.recipe.id, !this.recipe.favorite)
      .subscribe((data) => (this.recipe.favorite = data));
  }
  onDeleteRecipe() {
    this.editRecipe.deleteRecipe(this.recipe.id).subscribe((data) => {
      /*emit deleted event*/ console.log(data);
      this.router.navigate(['/cookbook', `${this.userId}`]);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
