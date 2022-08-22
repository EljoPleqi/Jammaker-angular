import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Recipe } from 'src/app/shared/interfaces/recipe';
import { PostUserTypedRecipeService } from 'src/app/shared/services/post-user-typed-recipe.service';
import { Router } from '@angular/router';
import { DisplayService } from 'src/app/shared/services/display.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-form',
  host: {
    class: 'h-full ',
  },
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit, OnDestroy {
  scrape!:Boolean
  ingredientsArray: string[] = [];
  instructionsArray: string[] = [];
  options: string[] = ['rock', 'pop'];
  faPlus = faPlusCircle;
  recipeForm!: FormGroup;

  @ViewChild('ingredient', { static: true }) ingredient!: ElementRef;
  @ViewChild('instruction', { static: true }) instruction!: ElementRef;

  constructor(
    private postUserRecipe: PostUserTypedRecipeService,
    private displayService: DisplayService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.displayService.typed$.next(true);
    this.recipeForm = new FormGroup({
      title: new FormControl(''),
      preptime: new FormControl(''),
      ingredients: new FormControl(''),
      instructionsString: new FormControl(''),
      category: new FormControl(''),
      genre: new FormControl('pop'),
    });
  }

  onSubmit() {
    const recipe: Recipe = this.recipeForm.value;
    recipe.ingredients = this.ingredientsArray.join('-$');
    recipe.instructionsString = this.instructionsArray.join('-$');
    this.postUserRecipe.PostUserRecipe(recipe).subscribe((data) => {
      this.route.navigate([`recipe/${data.id}`, `${data.playlistId}`]);
    });
  }

  private addToArray(array: string[], element: string) {
    array.push(element);
  }

  onAddIngredient(e: any) {
    e.preventDefault();
    this.addToArray(this.ingredientsArray, this.ingredient.nativeElement.value);
    this.ingredient.nativeElement.value = ""

  }

  onAddInstruction(e: any) {
    e.preventDefault();
    this.addToArray(
      this.instructionsArray,
      this.instruction.nativeElement.value
    );
    this.instruction.nativeElement.value = ""
  }

  setScrape(state: boolean) {
    this.scrape = state
  }

  ngOnDestroy(): void {
    this.displayService.typed$.next(false);
  }
}
