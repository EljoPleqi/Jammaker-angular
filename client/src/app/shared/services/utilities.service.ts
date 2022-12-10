import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEqual } from 'lodash';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Condiment, Recipe } from '../interfaces/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  areSameRecipe(obj1: Recipe | Condiment, obj2: Recipe | Condiment): boolean {
    return isEqual(obj1, obj2);
  }
}
