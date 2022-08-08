import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ingredients-panel',
  templateUrl: './ingredients-panel.component.html',
  styleUrls: ['./ingredients-panel.component.css'],
})
export class IngredientsPanelComponent implements OnInit {
  @Input() ingredients: string[] | any = [];
  constructor() {}

  ngOnInit(): void {}
}
