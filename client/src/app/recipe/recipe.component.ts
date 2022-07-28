import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/shared/interfaces/recipe';
import { GetRecipeService } from 'src/app/shared/services/get-recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  id: number = 0;
  recipe!: Recipe;
  loading: Boolean = true;

  constructor(
    private route: ActivatedRoute,
    private recipeService: GetRecipeService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.recipeService.fetchRecipe(this.id).subscribe((data) => {
      this.recipe = data;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {}
}
