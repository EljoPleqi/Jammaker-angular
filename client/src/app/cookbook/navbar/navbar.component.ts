import { Component, Input, OnInit } from '@angular/core';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ToggleSidebarService } from 'src/app/shared/services/toggle-sidebar.service';
import { User } from '../../shared/interfaces/user';
import { GetUserService } from '../../shared/services/get-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoading: boolean = true;

  @Input() user: User | undefined;

  menu = faBars;
  search = faMagnifyingGlass;
  userSubscription = new Subscription();

  constructor(
    private fetchUser: GetUserService,
    private toggleSidebarService: ToggleSidebarService
  ) {
    this.userSubscription = this.fetchUser.user$.subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
  }
  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarService.toggleSidebar();
  }
}
