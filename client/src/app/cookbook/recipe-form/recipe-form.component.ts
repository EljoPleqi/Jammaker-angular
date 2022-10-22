import {
  Component,
  OnDestroy,
  OnInit,

} from '@angular/core';

@Component({
  selector: 'app-recipe-form',
  host: {
    class: 'h-full ',
  },
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit, OnDestroy {
  scrape!: boolean;
  constructor() {}
  toggleForm: boolean = false;

  ngOnInit(): void {}

  setScrape(state: boolean) {
    this.scrape = state;
  }
  ngOnDestroy(): void {}
}
