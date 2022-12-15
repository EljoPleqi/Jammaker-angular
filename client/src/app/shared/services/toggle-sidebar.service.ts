import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToggleSidebarService {
  private isOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  favorites$ = this.isOpenSubject.asObservable();

  constructor() {}

  toggleSidebar() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }
}
