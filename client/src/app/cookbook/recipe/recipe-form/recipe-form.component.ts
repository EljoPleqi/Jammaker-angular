import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  NewCondimentData,
  NewRecipeData,
  Recipe,
} from 'src/app/shared/interfaces/recipe.model';
import { PostUserTypedRecipeService } from 'src/app/cookbook/recipe/api/post-user-typed-recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayService } from 'src/app/shared/services/display.service';
import {
  faPlusCircle,
  faCamera,
  faQrcode,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GetUserService } from 'src/app/shared/services/get-user.service';

@Component({
  selector: 'app-Recipe-form',
  templateUrl: './Recipe-form.component.html',
  styleUrls: ['./Recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit, OnDestroy {
  userId: number | undefined;
  userSubscription = new Subscription();

  scrape: boolean = false;
  isMeal: boolean = true;

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

  files: File[] = [];

  constructor(
    private fb: FormBuilder,
    private postUserRecipe: PostUserTypedRecipeService,
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
    this.userSubscription = this.fetchUser.user$.subscribe(
      (user) => (this.userId = user?.id)
    );
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

    this.postUserRecipe
      .PostUserRecipe(formData, this.isMeal)
      .subscribe((data) =>
        this.router.navigate([
          `/cookbook/${this.userId}/${this.isMeal ? 'recipes' : 'condiments'}`,
          `${data.id}`,
        ])
      );
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
