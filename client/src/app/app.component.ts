import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './shared/interfaces/user';
import { GetUserService } from './shared/services/get-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Jammaker';
}
