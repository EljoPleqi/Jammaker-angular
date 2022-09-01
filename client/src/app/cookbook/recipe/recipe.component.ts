import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe, RecipeData } from 'src/app/shared/interfaces/recipe.model';
import { GetRecipeService } from 'src/app/shared/services/get-recipe.service';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartSolid,
  faPenToSquare as faPenToSquareSolid,
  faTrashCan as faTrashCanSolid,
  faHomeAlt as faHomeSolid
} from '@fortawesome/free-solid-svg-icons';
import { GetUserService } from '../../shared/services/get-user.service';

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
  faHomeSolid = faHomeSolid
  // * variables
  id: number = 0;
  recipe!: Recipe;
  loading: Boolean = true;
  recipeData!: RecipeData;



  constructor(
    private route: ActivatedRoute,
    private user:GetUserService,
    private recipeService: GetRecipeService
  ) {}

  ngOnInit(): void {
    // * get recipe id from the url params

    this.id = this.route.snapshot.params['id'];

    this.recipeService.fetchRecipe(this.id).subscribe((data) => {
      this.recipeData = {
        id: data.recipe.id,
        playlistId: data.playlist,
      };
      this.recipe = data.recipe;
      this.loading = false;
      // window.open(
      //   `https://open.spotify.com/playlist/${this.playlist}`,
      //   '_blank'
      // );
    });
  }

  ngOnDestroy(): void {
    // ! unsubscribe here
  }
}
