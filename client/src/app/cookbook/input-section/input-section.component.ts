import { Component, OnInit } from '@angular/core';
import { PostUrlService } from 'src/app/shared/services/post-url.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-section',
  templateUrl: './input-section.component.html',
  styleUrls: ['./input-section.component.css'],
})
export class InputSectionComponent implements OnInit {
  constructor(private route: Router, private RecipeService: PostUrlService) {}

  ngOnInit(): void {}
  onSubmit(formData: NgForm) {
    console.log(formData.form.value);
    this.RecipeService.postUrl(formData.form.value).subscribe((recipeData) => {
      this.route.navigate([`recipe/${recipeData.id}`]);
    });
  }
}
