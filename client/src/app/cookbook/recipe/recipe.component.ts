import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, RecipeData } from 'src/app/shared/interfaces/recipe.model';
import { GetRecipeService } from 'src/app/shared/services/get-recipe.service';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartSolid,
  faPenToSquare as faPenToSquareSolid,
  faTrashCan as faTrashCanSolid,
  faHomeAlt as faHomeSolid
} from '@fortawesome/free-solid-svg-icons';
import { EditRecipeService } from 'src/app/shared/services/edit-recipe.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';

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
  recipe!: Recipe;
  loading: Boolean = true;
  recipeData!: RecipeData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private editRecipe: EditRecipeService,
    private recipeService: GetRecipeService,
    private getUser:GetUserService
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
       console.log(this.recipe);
    });

    console.log(this.recipe);
  }

  onAddToFavorites() {
    this.editRecipe
      .makeFavourite(this.recipe.id, !this.recipe.favorite)
      .subscribe((data) => (this.recipe.favorite = data));
  }
  onDeleteRecipe() {
    this.editRecipe.deleteRecipe(this.recipe.id).subscribe(data => {/*emit deleted event*/ console.log(data)
      this.router.navigate(['/cookbook',`${this.getUser.user.id}`])}
    )
  }

  ngOnDestroy(): void {
    // ! unsubscribe here
  }
}
