import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { InputSectionComponent } from './cookbook/input-section/input-section.component';
import { RecipeComponent } from './cookbook/recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CookbookComponent,
    InputSectionComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
