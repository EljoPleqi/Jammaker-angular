import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Condiment,
  Recipe,
  RecipeData,
} from 'src/app/shared/interfaces/recipe.model';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart,
  faPenToSquare,
  faTrashCan,
  faHomeAlt as faHome,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { RecipeApiService } from 'src/app/cookbook/recipe/api/recipe-api.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { ReplaySubject, Subscription } from 'rxjs';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { Instruction } from 'src/app/shared/interfaces/instruction';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  // * icons
  faClock = faClock;
  faHeart = faHeart;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faHome = faHome;
  faSave = faSave;

  // * variables
  id: number = 0;
  userId: number | undefined;
  recipeType: string = '';

  toggleEdit: boolean = false;
  isLoading: boolean = true;

  recipe?: Recipe | Condiment;
  updatedRecipe?: Recipe | Condiment;
  recipeData!: RecipeData;

  userSubscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeApiService: RecipeApiService,
    private fetchUser: GetUserService,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    // * get recipe id from the url params

    this.id = this.route.snapshot.params['id'];
    this.recipeType = this.route.snapshot.url[0].path;
    this.userSubscription = this.fetchUser.user$.subscribe(
      (user) => (this.userId = user?.id)
    );

    this.recipeApiService
      .fetchRecipe(this.id, this.recipeType)
      .subscribe((data) => {
        this.recipeData = {
          id: data.recipe.id,
          playlistId: data.playlist,
        };
        this.recipe = data.recipe;
        this.updatedRecipe = { ...this.recipe };
        this.isLoading = false;
      });
  }

  onAddToFavorites() {
    if (!this.recipe) {
      console.error('No Recipe');
      return;
    }
    this.recipeApiService
      .makeFavourite(this.recipe.id, this.recipe.favorite, this.recipeType)
      .subscribe((data) => {
        this.recipe ? (this.recipe.favorite = data) : false;
      });
  }
  onDeleteRecipe() {
    if (!this.recipe) {
      return;
    }
    this.recipeApiService
      .deleteRecipe(this.recipe.id, this.recipeType!)
      .subscribe((_) => {
        this.router.navigate(['/cookbook', `${this.userId}`]);
      });
  }
  onToggleEdit() {
    this.toggleEdit = !this.toggleEdit;
  }

  onCompareData() {
    this.utilitiesService.triggerChildEvent().subscribe();
    this.toggleEdit = !this.toggleEdit;
  }

  createNewInstructions(data: Instruction[]) {
    if (this.updatedRecipe) {
      this.updatedRecipe.instructions = data;
      this.compareData();
    }
    return;
  }
  private compareData() {
    if (
      !this.utilitiesService.areSameRecipe(this.recipe!, this.updatedRecipe!)
    ) {
      console.log(6);
      this.recipeApiService.editRecipe(this.updatedRecipe).subscribe((data) => {
        console.log(data);
      });
    }
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
