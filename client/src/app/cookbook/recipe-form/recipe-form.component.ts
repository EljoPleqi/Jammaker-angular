import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/shared/interfaces/recipe';
import { PostUserTypedRecipeService } from 'src/app/shared/services/post-user-typed-recipe.service';
import { Router } from '@angular/router';
import { DisplayService } from 'src/app/shared/services/display.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-form',
  host: {
    class: 'h-full ',
  },
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit, OnDestroy {
  scrape!: Boolean;
  ingredientsArray: string[] = [];
  instructionsArray: string[] = [];
  options: string[] = [
    'rock',
    'pop',
    'uk pop',
    'modern rock',
    'elector pop',
    'indie pop',
  ];
  faPlus = faPlusCircle;
  recipeForm!: FormGroup;
  formSub!: Subscription;

  @ViewChild('ingredient') ingredient!: ElementRef;
  @ViewChild('instruction') instruction!: ElementRef;

  constructor(
    private postUserRecipe: PostUserTypedRecipeService,
    private displayService: DisplayService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.displayService.typed$.next(true);
    this.recipeForm = new FormGroup({
      title: new FormControl('', Validators.required),
      preptime: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      genre: new FormControl('pop', Validators.required),
      image: new FormControl(''),
      servings: new FormControl(4, Validators.required),
    });
  }

  setScrape(state: boolean) {
    this.scrape = state;
  }

  onSubmit() {
    const recipe: Recipe = this.recipeForm.value;

    if (this.validateArrays(this.ingredientsArray)) {
      alert("Ingredients can't be empty");
      return;
    }
    if (this.validateArrays(this.instructionsArray)) {
      alert("instructions can't be empty");
      return;
    }

    recipe.ingredients = this.ingredientsArray.join('-$');
    recipe.instructionsString = this.instructionsArray.join('-$');
    this.formSub = this.postUserRecipe
      .PostUserRecipe(recipe)
      .subscribe((data) => {
        this.route.navigate([`recipe/${data.id}`, `${data.playlistId}`]);
      });
    console.log(this.recipeForm);
  }

  onAddIngredient(e: any) {
    e.preventDefault();
    this.addToArray(this.ingredientsArray, this.ingredient.nativeElement.value);
    this.ingredient.nativeElement.value = '';
  }

  onAddInstruction(e: any) {
    e.preventDefault();
    this.addToArray(
      this.instructionsArray,
      this.instruction.nativeElement.value
    );
    this.instruction.nativeElement.value = '';
  }

  ngOnDestroy(): void {
    this.displayService.typed$.next(false);
  }

  private addToArray(array: string[], element: string) {
    array.push(element);
  }
  private validateArrays(array: string[]): boolean {
    if (array.length === 0) {
      return true;
    }
    return false;
  }
}
