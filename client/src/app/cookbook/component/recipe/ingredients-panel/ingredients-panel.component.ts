import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { skip } from 'rxjs';
import { Ingredient } from 'src/app/shared/interfaces/ingredients';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

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
    private utilitiesService: UtilitiesService
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
    this.utilitiesService.childEvent$.pipe(skip(1)).subscribe((_) => {
      this.assembleNewIngredients(this.editIngredientsForm);
    });
  }

  assembleNewIngredients(form: FormGroup) {
    console.log();
    this.getNewIngredients.emit(form.get('ingredients')?.value as Ingredient[]);
  }
}
