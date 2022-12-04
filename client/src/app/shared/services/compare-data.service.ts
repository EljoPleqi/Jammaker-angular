import { Injectable } from '@angular/core';
import { isEqual } from 'lodash';
import { Condiment, Recipe } from '../interfaces/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class CompareDataService {
  constructor() {}

  areSameRecipe(obj1: Recipe | Condiment, obj2: Recipe | Condiment): boolean {
    return isEqual(obj1, obj2);
  }
}
