import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CookbookComponent } from './cookbook/cookbook.component';

const routes: Routes = [
  {path: "", component: HomeComponent },
  {path: "cookbook/:id", component: CookbookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
