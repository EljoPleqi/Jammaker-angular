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
  constructor(private route: Router, private recipeService: PostUrlService) {}
  @Output() spinner = new EventEmitter<boolean>();
  playlist: string = '';
  ngOnInit(): void {}
  onSubmit(formData: NgForm) {
    this.recipeService.postUrl(formData.form.value).subscribe((recipeData) => {
      this.playlist = recipeData.playlistId;
      this.route.navigate([`recipe/${recipeData.id}`, `${this.playlist}`]);
      this.spinner.emit(true);
    });
  }
}
