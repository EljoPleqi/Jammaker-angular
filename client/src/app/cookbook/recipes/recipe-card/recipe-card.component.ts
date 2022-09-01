import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/interfaces/recipe.model';
import { GetRecipeService } from 'src/app/shared/services/get-recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor(private router: Router, private route:ActivatedRoute) { }

  onOpenRecipe() {
    this.router.navigate([`recipe/${this.recipe.id}`], {
      relativeTo: this.route,
    });
  }
  ngOnInit(): void {}
}
