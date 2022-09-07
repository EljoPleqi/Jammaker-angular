import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { InputSectionComponent } from './cookbook/input-section/input-section.component';
import { RecipeComponent } from './cookbook/recipe/recipe.component'
import { SidebarComponent } from './cookbook/sidebar/sidebar.component';
import { RecipesComponent } from './cookbook/recipes/recipes.component';
import { RecipeCardComponent } from './cookbook/recipes/recipe-card/recipe-card.component';
import { InstructionCardComponent } from './cookbook/recipe/instruction-card/instruction-card.component';
import { IngredientsPanelComponent } from './cookbook/recipe/ingredients-panel/ingredients-panel.component'
import { RecipeFormComponent } from './cookbook/recipe-form/recipe-form.component';
import { PlaylistComponent } from './cookbook/recipe/playlist/playlist.component';
import { ManualFormComponent } from './cookbook/recipe-form/manual-form/manual-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CookbookComponent,
    InputSectionComponent,
    RecipeComponent,
    SidebarComponent,
    RecipesComponent,
    RecipeCardComponent,
    InstructionCardComponent,
    IngredientsPanelComponent,
    RecipeFormComponent,
    PlaylistComponent,
    ManualFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
