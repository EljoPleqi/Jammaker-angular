import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-form',
  host: {
    class: 'flex flex-col h-full justify-center items-center',
  },
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  ingredientsArray: string[] = [];
  instructionsArray: string[] = [];
  constructor() {}

  ngOnInit(): void {}
}
