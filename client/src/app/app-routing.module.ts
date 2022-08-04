import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeFormComponent } from './cookbook/recipe-form/recipe-form.component';
import { RecipesComponent } from './cookbook/recipes/recipes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cookbook/:id',
    component: CookbookComponent,
    children: [
      { path: '', component: RecipesComponent },
      { path: 'create', component: RecipeFormComponent },
    ],
  },
  { path: 'recipe/:id/:playlist_id', component: RecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
