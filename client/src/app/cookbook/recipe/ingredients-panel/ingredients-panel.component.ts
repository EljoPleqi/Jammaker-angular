import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient } from 'src/app/shared/interfaces/ingredients';

@Component({
  selector: 'app-ingredients-panel',
  templateUrl: './ingredients-panel.component.html',
  styleUrls: ['./ingredients-panel.component.css'],
})
export class IngredientsPanelComponent implements OnInit {
  @Input() ingredients: Ingredient[] | undefined;
  @Input() toggleEdit: boolean = false;
  editIngredientsForm: FormGroup | undefined = undefined;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ingredients?.forEach((ingredient: Ingredient, i: number) => {
      this.editIngredientsForm?.addControl(
        `${ingredient}${i}`,
        ingredient.content
      );
    });
  }
}
