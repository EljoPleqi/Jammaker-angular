import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Condiment, Recipe } from 'src/app/shared/interfaces/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe | Condiment;

  constructor(private router: Router, private route: ActivatedRoute) {}

  onOpenRecipe() {
    this.router.navigate(
      [
        'preptime' in this.recipe
          ? `recipes/${this.recipe.id}`
          : `condiments/${this.recipe.id}`,
      ],
      {
        relativeTo: this.route,
      }
    );
  }
}
