import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import {
  faBookmark,
  faSquarePlus,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() user!: User;
  faBookmark = faBookmark;
  faSquarePlus = faSquarePlus;
  faHeart = faHeart;
  constructor() {}

  ngOnInit(): void {}
}
