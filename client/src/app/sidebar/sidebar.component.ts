import { Component, OnInit } from '@angular/core';
import {
  faBookmark,
  faSquarePlus,
  faHeart,
  faLemon,
} from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { Subscription } from 'rxjs';
import { DiplayFavoritesService } from '../shared/services/diplay-favorites.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private fetchUser: GetUserService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private displayFavoritesService: DiplayFavoritesService
  ) {}
  isLoading: boolean = true;
  id!: string;
  user: User | undefined;
  faBookmark = faBookmark;
  faSquarePlus = faSquarePlus;
  faHeart = faHeart;
  faCondiments = faLemon;

  userSubscription = new Subscription();

  url: string = `cookbook/${this.activeRoute.snapshot.params['id']}`;

  ngOnInit(): void {
    console.log(this.activeRoute);
    this.userSubscription = this.fetchUser.user$.subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
  }

  toDashboard() {
    this.route.navigate([this.url]);
    this.displayFavoritesService.showAllRecipes();
  }
  toCreation() {
    this.route.navigate(['create'], { relativeTo: this.activeRoute });
  }
}
