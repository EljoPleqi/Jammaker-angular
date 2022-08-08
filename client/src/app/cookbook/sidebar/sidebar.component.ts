import { Component, Input, OnInit } from '@angular/core';
import {
  faBookmark,
  faSquarePlus,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { GetUserService } from 'src/app/shared/services/get-user.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private userData: GetUserService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {}

  id!: string;
  user: User = this.userData.user;
  faBookmark = faBookmark;
  faSquarePlus = faSquarePlus;
  faHeart = faHeart;
  url: string = `cookbook/${this.activeRoute.snapshot.params['id']}`;

  ngOnInit(): void {
    this.activeRoute.snapshot.params;
  }

  toDashboard() {
    this.route.navigate([this.url]);
  }
  toCreation() {
    this.route.navigate(['create'], { relativeTo: this.activeRoute });
  }
}
