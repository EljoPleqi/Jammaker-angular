import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Recipe } from 'src/app/shared/interfaces/recipe';
import { GetRecipeService } from 'src/app/shared/services/get-recipe.service';
import { faHeart, faClock } from '@fortawesome/free-regular-svg-icons';
import { RecipeResponse } from '../shared/interfaces/recipe_response';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  // * icons
  faHeart = faHeart;
  faClock = faClock;
  // * variables
  id: number = 0;
  recipe!: Recipe;
  loading: Boolean = true;
  playlist: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: GetRecipeService
  ) {}

  ngOnInit(): void {
    // * get recipe id from the url params

    this.id = this.route.snapshot.params['id'];

    this.recipeService
      .fetchRecipe(this.id)
      .pipe(
        map((data: RecipeResponse) => {
          const regex = new RegExp(/ [0-9\u00BC-\u00BE\u2150-\u215E\u2189]+/g);
          data.recipe.ingredientsArray = data.recipe.ingredients
            .replace(regex, (match) => `-${match}`)
            .split('-')
            .map((sentence: string) => sentence.trim());

          return data;
        })
      )
      .subscribe((data) => {
        this.recipe = data.recipe;
        this.playlist = data.playlist;
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
