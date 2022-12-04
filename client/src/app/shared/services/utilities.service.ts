import { Injectable } from '@angular/core';
import { isEqual } from 'lodash';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Condiment, Recipe } from '../interfaces/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  childEventSubject: BehaviorSubject<void> = new BehaviorSubject<void>(
    undefined
  );
  childEvent$ = this.childEventSubject.asObservable();
  constructor() {}

  areSameRecipe(obj1: Recipe | Condiment, obj2: Recipe | Condiment): boolean {
    return isEqual(obj1, obj2);
  }

  triggerChildEvent(): Observable<never> {
    this.childEventSubject.next();
    return EMPTY;
  }
}
