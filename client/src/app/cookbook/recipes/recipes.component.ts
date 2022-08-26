import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/shared/interfaces/recipe.model';
import { User } from 'src/app/shared/interfaces/user';
import { GetUserService } from 'src/app/shared/services/get-user.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  user: User = this.userData.user;
  recipes: Recipe[] = this.userData.recipes;
  constructor(private userData: GetUserService) {}

  ngOnInit(): void {}
}
