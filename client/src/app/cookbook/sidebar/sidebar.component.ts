import { Component, OnInit } from '@angular/core';
import {
  faSquarePlus,
  faHeart,
  faLemon,
} from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { Subscription } from 'rxjs';
import { ToggleSidebarService } from '../../shared/services/toggle-sidebar.service';
import { faBook, faUtensils } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private toggleSidebarService: ToggleSidebarService
  ) {}
  isOpen: boolean = false;

  cookbook = faUtensils;
  faSquarePlus = faSquarePlus;
  faHeart = faHeart;
  faCondiments = faLemon;

  url: string = `cookbook/${this.activeRoute.snapshot.params['id']}`;

  ngOnInit(): void {
    this.toggleSidebarService.favorites$.subscribe((data) => {
      this.isOpen = data;
    });
  }

  toDashboard() {
    this.route.navigate([this.url]);
  }
  toCreation() {
    this.route.navigate(['create'], { relativeTo: this.activeRoute });
  }
}
