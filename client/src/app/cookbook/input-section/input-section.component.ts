import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostUrlService } from 'src/app/shared/services/post-url.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-section',
  templateUrl: './input-section.component.html',
  styleUrls: ['./input-section.component.css'],
})
export class InputSectionComponent implements OnInit {
  @Output() spinner = new EventEmitter<boolean>();
  playlist: string = '';

  constructor(private route: Router, private recipeService: PostUrlService) {}

  onSubmit(formData: NgForm) {
    this.recipeService.postUrl(formData.form.value).subscribe((recipeData) => {
      this.route.navigate([
        `recipe/${recipeData.id}`,
        `${recipeData.playlistId}`,
      ]);
      this.spinner.emit(true);
    });
  }

  ngOnInit(): void {}
}
