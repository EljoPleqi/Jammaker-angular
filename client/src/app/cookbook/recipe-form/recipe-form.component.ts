import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  NewCondimentData,
  NewRecipeData,
} from 'src/app/shared/interfaces/recipe.model';
import { Router } from '@angular/router';
import {
  faPlusCircle,
  faCamera,
  faQrcode,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { RecipeApiService } from '../recipe/api/recipe-api.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit, OnDestroy {
  userId: number | undefined;
  userSubscription = new Subscription();

  scrape: boolean = false;
  isMeal: boolean = true;
  isLoading: boolean = true;

  ingredients: string[] = [];
  instructions: string[] = [];

  tags: string[] = [];

  faPlus = faPlusCircle;
  faCamera = faCamera;
  faQrcode = faQrcode;
  faPenToSquare = faPenToSquare;

  genres: string[] = [
    'rock',
    'pop',
    'uk pop',
    'modern rock',
    'elector pop',
    'indie pop',
  ];

  types: string[] = ['Meal', 'Condiment'];

  files: File[] = [];

  constructor(
    private fb: FormBuilder,
    private recipeApiService: RecipeApiService,
    private router: Router,
    private fetchUser: GetUserService
  ) {}

  recipeForm = this.fb.group({
    title: ['', Validators.required],
    image: [''],
    prepTime: [''],
    servings: [''],
    instructions: this.fb.array([new FormControl(null, Validators.required)]),
    ingredients: this.fb.array([new FormControl(null, Validators.required)]),
    category: [''],
    genre: ['rock'],
    tags: [''],
  });

  condimentForm = this.fb.group({
    title: ['', Validators.required],
    image: [''],
    favorire: [false],
    instructions: this.fb.array([new FormControl(null, Validators.required)]),
    ingredients: this.fb.array([new FormControl(null, Validators.required)]),
  });

  ngOnInit(): void {
    this.userSubscription = this.fetchUser.user$.subscribe((user) => {
      this.userId = user?.id;
      this.isLoading = false;
    });
  }

  onIsMeal = (): boolean => (this.isMeal = !this.isMeal);

  onIsScraping = (): boolean => (this.scrape = !this.scrape);

  onAddIngredient() {
    const control = new FormControl(null, Validators.required);

    this.isMeal
      ? (<FormArray>this.recipeForm.get('ingredients')).push(control)
      : (<FormArray>this.condimentForm.get('ingredients')).push(control);
  }
  onAddInstruction() {
    const control = new FormControl(null, Validators.required);
    this.isMeal
      ? (<FormArray>this.recipeForm.get('instructions')).push(control)
      : (<FormArray>this.condimentForm.get('instructions')).push(control);
  }

  onSubmit() {
    this.ingredients = this.recipeForm.controls.ingredients.controls.map(
      (data): string => data.value + ''
    );

    this.instructions = this.recipeForm.controls.instructions.controls.map(
      (data): string => data.value + ''
    );

    const formData: NewRecipeData | NewCondimentData = this.makeFormData(
      this.isMeal
    );
    this.isLoading = true;
    this.recipeApiService
      .postUserRecipe(formData, this.isMeal)
      .subscribe((data) => {
        this.isLoading = false;

        this.router.navigate([
          `/cookbook/${this.userId}/${this.isMeal ? 'recipes' : 'condiments'}`,
          `${data.id}`,
        ]);
      });
  }

  private makeFormData = (isMeal: boolean): NewRecipeData | NewCondimentData =>
    isMeal
      ? {
          title: this.recipeForm.controls.title.value,
          prepTime: this.recipeForm.controls.prepTime.value,
          image: this.recipeForm.controls.image?.value,
          servings: Number(this.recipeForm.controls.servings.value),
          category: this.recipeForm.controls.category.value,
          genre: this.recipeForm.controls.genre.value,
          ingredients: this.ingredients.join('-$'),
          instructions: this.instructions.join('-$'),
          favorite: false,
        }
      : {
          title: this.recipeForm.controls.title.value,
          image: this.recipeForm.controls.image?.value,
          ingredients: this.ingredients.join('-$'),
          instructions: this.instructions.join('-$'),
          favorite: false,
        };

  getControls = (arrayName: string) =>
    this.isMeal
      ? (<FormArray>this.recipeForm.get(`${arrayName}`)).controls
      : (<FormArray>this.condimentForm.get(`${arrayName}`)).controls;

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
