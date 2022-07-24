import { Component, OnInit } from '@angular/core';
import { GetUserService } from '../shared/services/get-user.service';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css']
})
export class CookbookComponent implements OnInit {
  userId: string | null = ''

  constructor(private loggedUser: GetUserService) {
    this.userId = location.pathname.split('/')[2]

  }

  ngOnInit(): void {
    this.loggedUser.fetchUser(this.userId).subscribe(data => {
      console.log(data)
      this.loggedUser.user = data
    })
  }
}
