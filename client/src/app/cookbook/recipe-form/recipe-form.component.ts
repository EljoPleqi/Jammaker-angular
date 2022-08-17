import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Recipe } from 'src/app/shared/interfaces/recipe';
import { PostUserTypedRecipeService } from 'src/app/shared/services/post-user-typed-recipe.service';
import { Router } from '@angular/router';
import { DisplayService } from 'src/app/shared/services/display.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-form',
  host: {
    class: 'flex flex-col h-full justify-center items-center',
  },
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit, OnDestroy {
  ingredientsArray: string[] = [];
  instructionsArray: string[] = [];
  options: string[] = ['rock', 'pop'];
  faPlus = faPlusCircle;

  @ViewChild('ingredient', { static: true }) ingredient!: ElementRef;
  @ViewChild('instruction', { static: true }) instruction!: ElementRef;

  constructor(
    private postUserRecipe: PostUserTypedRecipeService,
    private displayService: DisplayService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.displayService.typed$.next(true);
  }

  onSubmit(formData: NgForm) {
    const recipe: Recipe = formData.form.value;
    recipe.ingredients = this.ingredientsArray.join('-');
    recipe.instructionsString = this.instructionsArray.join('-');
    this.postUserRecipe.PostUserRecipe(recipe).subscribe((data) => {
      this.route.navigate([`recipe/${data.id}`, `${data.playlistId}`]);
    });
  }

  private addToArray(array: string[], element: string) {
    array.push(element);
  }

  onAddIngredient() {
    this.addToArray(this.ingredientsArray, this.ingredient.nativeElement.value);
  }

  onAddInstruction() {
    this.addToArray(
      this.instructionsArray,
      this.instruction.nativeElement.value
    );
  }

  ngOnDestroy(): void {
    this.displayService.typed$.next(false);
  }
}
