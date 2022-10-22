import { Component, OnInit } from '@angular/core';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { User } from 'src/app/shared/interfaces/user';
import { Condiment } from 'src/app/shared/interfaces/recipe.model';
@Component({
  selector: 'app-condiments',
  templateUrl: './condiments.component.html',
  styleUrls: ['./condiments.component.css'],
})
export class CondimentsComponent implements OnInit {
  user: User = this.userData.user;
  recipes: Condiment[] = this.userData.recipes;
  constructor(private userData: GetUserService) {}


  ngOnInit(): void {}
}
