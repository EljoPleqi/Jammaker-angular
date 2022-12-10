import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { skip, switchMap } from 'rxjs';
import { Ingredient } from 'src/app/shared/interfaces/ingredients';
import { RecipeUpdateStateService } from '../shared/services/recipe-update-state.service';

@Component({
  selector: 'app-ingredients-panel',
  templateUrl: './ingredients-panel.component.html',
  styleUrls: ['./ingredients-panel.component.css'],
})
export class IngredientsPanelComponent implements OnInit {
  @Input() ingredients: Ingredient[] | undefined;
  @Input() toggleEdit: boolean = false;

  @Output() getNewIngredients: EventEmitter<Ingredient[]> = new EventEmitter<
    Ingredient[]
  >();
  editIngredientsForm: FormGroup;
  newIngredients: FormArray;

  constructor(
    private fb: FormBuilder,
    private recipeUpdateStateService: RecipeUpdateStateService
  ) {
    this.editIngredientsForm = this.fb.group({
      ingredients: this.fb.array([]),
    });
    this.newIngredients = <FormArray>(
      this.editIngredientsForm.get('ingredients')
    );
  }

  ngOnInit(): void {
    this.ingredients?.forEach((ingredient: Ingredient, i: number) => {
      this.newIngredients.push(this.fb.control(ingredient.content));
    });
    this.recipeUpdateStateService.gatherData$
      .pipe(skip(1))
      .pipe(
        switchMap((_) =>
          this.recipeUpdateStateService.gatherNewIngredients(
            this.assembleNewIngredients(this.editIngredientsForm)
          )
        )
      )
      .subscribe();
  }

  private assembleNewIngredients = (form: FormGroup) =>
    form.get('ingredients')?.value as Ingredient[];
}
