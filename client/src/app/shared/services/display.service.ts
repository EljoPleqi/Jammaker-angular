import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  // TODO: create a service that emits an event when the input-form component loads
  typed$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  showSection(data: boolean) {
    return this.typed$.next(data);
  }
}
