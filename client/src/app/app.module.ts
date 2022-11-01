import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { ScrapperInputSectionComponent } from './cookbook/recipe/recipe-form/scrapper-input/scrapper-input-section.component';
import { RecipeComponent } from './cookbook/recipe/recipe.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipesComponent } from './cookbook/recipes/recipes.component';
import { RecipeCardComponent } from './shared/components/recipe-card/recipe-card.component';
import { InstructionCardComponent } from './cookbook/recipe/instruction-card/instruction-card.component';
import { IngredientsPanelComponent } from './cookbook/recipe/ingredients-panel/ingredients-panel.component';
import { RecipeFormComponent } from './cookbook/recipe/recipe-form/recipe-form.component';
import { PlaylistComponent } from './cookbook/recipe/playlist/playlist.component';
import { CondimentsComponent } from './cookbook/condiments/condiments.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CookbookComponent,
    ScrapperInputSectionComponent,
    RecipeComponent,
    SidebarComponent,
    RecipesComponent,
    RecipeCardComponent,
    InstructionCardComponent,
    IngredientsPanelComponent,
    RecipeFormComponent,
    PlaylistComponent,
    CondimentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgxDropzoneModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
