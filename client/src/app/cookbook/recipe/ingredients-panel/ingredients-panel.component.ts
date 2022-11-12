import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/shared/interfaces/ingredients';

@Component({
  selector: 'app-ingredients-panel',
  templateUrl: './ingredients-panel.component.html',
  styleUrls: ['./ingredients-panel.component.css'],
})
export class IngredientsPanelComponent implements OnInit {
  @Input() ingredients!: Ingredient[];
  constructor() {}

  ngOnInit(): void {
    console.log(this.ingredients);
  }
}
