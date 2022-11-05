import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiplayFavoritesService {
  private favoritesSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {}

  showFavorites = () => this.favoritesSubject.next(true);

  showAllRecipes = () => this.favoritesSubject.next(false);
}
