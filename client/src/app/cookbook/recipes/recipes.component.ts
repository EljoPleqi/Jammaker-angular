import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/shared/interfaces/recipe';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  @Input() user!: User;
  @Input() recipes!: Recipe[];
  constructor() {}

  ngOnInit(): void {}
}
