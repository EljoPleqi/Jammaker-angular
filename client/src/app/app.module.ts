import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { ScrapperInputSectionComponent } from './cookbook/component/recipe/recipe-form/scrapper-input/scrapper-input-section.component';
import { RecipeComponent } from './cookbook/component/recipe/recipe.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipesPageComponent } from './cookbook/pages/recipes-page/recipes-page.component';
import { RecipeCardComponent } from './shared/components/recipe-card/recipe-card.component';
import { InstructionCardComponent } from './cookbook/component/recipe/instruction-card/instruction-card.component';
import { IngredientsPanelComponent } from './cookbook/component/recipe/ingredients-panel/ingredients-panel.component';
import { RecipeFormComponent } from './cookbook/component/recipe/recipe-form/recipe-form.component';
import { PlaylistComponent } from './cookbook/component/recipe/playlist/playlist.component';
import { AutoFocusDirective } from './shared/auto-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CookbookComponent,
    ScrapperInputSectionComponent,
    RecipeComponent,
    IngredientsPanelComponent,
    PlaylistComponent,

    SidebarComponent,
    RecipesPageComponent,
    RecipeCardComponent,
    InstructionCardComponent,

    RecipeFormComponent,

    AutoFocusDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgxDropzoneModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
