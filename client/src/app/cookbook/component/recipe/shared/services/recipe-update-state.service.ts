import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Ingredient } from 'src/app/shared/interfaces/ingredients';
import { Instruction } from 'src/app/shared/interfaces/instruction';

@Injectable({
  providedIn: 'root',
})
export class RecipeUpdateStateService {
  gatherDataSubject: BehaviorSubject<void> = new BehaviorSubject<void>(
    undefined
  );
  gatherData$ = this.gatherDataSubject.asObservable();

  newInstructionsSubject: BehaviorSubject<Instruction[]> = new BehaviorSubject<
    Instruction[]
  >([]);
  newInstructions$ = this.newInstructionsSubject.asObservable();

  newIngredientsSubject: BehaviorSubject<Ingredient[]> = new BehaviorSubject<
    Ingredient[]
  >([]);

  newIngredients$ = this.newIngredientsSubject.asObservable();

  constructor() {}

  triggerGatherData(): Observable<never> {
    this.gatherDataSubject.next();
    return EMPTY;
  }

  gatherNewInstructions(instructions: Instruction[]) {
    this.newInstructionsSubject.next(instructions);
    return EMPTY;
  }
  gatherNewIngredients(ingredients: Ingredient[]) {
    this.newIngredientsSubject.next(ingredients);
    return EMPTY;
  }
}
