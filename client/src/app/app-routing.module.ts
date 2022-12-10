import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { RecipeComponent } from './cookbook/component/recipe/recipe.component';
import { RecipeFormComponent } from './cookbook/component/recipe/recipe-form/recipe-form.component';
import { RecipesComponent } from './cookbook/recipes/recipes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cookbook/:id',
    component: CookbookComponent,
    children: [
      { path: 'recipes/:id', component: RecipeComponent },
      { path: 'condiments/:id', component: RecipeComponent },
      { path: '', component: RecipesComponent },
      { path: 'create', component: RecipeFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
