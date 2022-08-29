import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../shared/interfaces/user';
import { Recipe } from '../shared/interfaces/recipe.model';
import { GetUserService } from '../shared/services/get-user.service';
import { DisplayService } from '../shared/services/display.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css'],
})
export class CookbookComponent implements OnInit, OnDestroy {
  spinner: boolean = false;
  userId: string | null = '';
  user!: User;
  recipes!: Recipe[];
  loading: boolean = true;
  userTyped: boolean = false;
  typedSub!: Subscription;

  constructor(
    private loggedUser: GetUserService,
    private displayService: DisplayService
  ) {
    this.userId = location.pathname.split('/')[2];
  }

  ngOnInit(): void {
    this.loggedUser.fetchUser(this.userId).subscribe((data) => {
      this.loggedUser.user = data.user;
      this.loggedUser.recipes = data.recipes;
      this.loading = false;
      this.typedSub = this.displayService.typed$.subscribe(
        (data) => (this.userTyped = data)
      );
    });
  }

  ngOnDestroy() {
    this.typedSub.unsubscribe();
  }

  loadSpinner(event: boolean) {
    this.spinner = event;
  }
}
