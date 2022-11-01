import { Component, OnInit } from '@angular/core';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { User } from 'src/app/shared/interfaces/user';
import { Condiment } from 'src/app/shared/interfaces/recipe.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-condiments',
  templateUrl: './condiments.component.html',
  styleUrls: ['./condiments.component.css'],
})
export class CondimentsComponent implements OnInit {
  user: User | undefined;

  userSubscription = new Subscription();
  constructor(private fetchUser: GetUserService) {}

  ngOnInit(): void {
    this.userSubscription = this.fetchUser.user$.subscribe(
      (user) => (this.user = user)
    );
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
