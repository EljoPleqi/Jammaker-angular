import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Condiment, Recipe } from 'src/app/shared/interfaces/recipe.model';
import { GetRecipeService } from 'src/app/cookbook/recipe/api/get-recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: Recipe | Condiment;

  constructor(private router: Router, private route: ActivatedRoute) {}

  onOpenRecipe() {
    this.router.navigate(
      [
        'preptime' in this.recipe
          ? `recipe/${this.recipe.id}`
          : `condiment/${this.recipe.id}`,
      ],
      {
        relativeTo: this.route,
      }
    );
  }
  ngOnInit(): void {}
}
