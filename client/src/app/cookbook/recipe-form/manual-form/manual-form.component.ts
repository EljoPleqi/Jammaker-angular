import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Recipe } from 'src/app/shared/interfaces/recipe.model';
import { PostUserTypedRecipeService } from 'src/app/shared/services/post-user-typed-recipe.service';
import { Router } from '@angular/router';
import { DisplayService } from 'src/app/shared/services/display.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manual-form',
  templateUrl: './manual-form.component.html',
  styleUrls: ['./manual-form.component.css'],
})
export class ManualFormComponent implements OnInit, OnDestroy {
  toggleForm: boolean = true
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
  constructor(
    // private fb: FormBuilder,
    private postUserRecipe: PostUserTypedRecipeService,
    private displayService: DisplayService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  onToggleForm() {}
  onAddIngredient(e: any) {}
  onAddInstruction(e: any) {}
  onSubmit() {}
  ngOnDestroy(): void {}

  private addToArray = (array: string[], element: string) => array.push(element)
  private validateArrays = (array: string[]): boolean => array.length === 0
  private toggle = (toggle: boolean):boolean => !toggle
}
