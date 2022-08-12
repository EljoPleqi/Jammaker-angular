import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiplayInputFieldService {
  // TODO: create a service that emits an event when the input-form component loads
  typed: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
}
