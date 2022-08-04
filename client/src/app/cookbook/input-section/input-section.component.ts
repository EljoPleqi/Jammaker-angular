import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostUrlService } from 'src/app/shared/services/post-url.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GetPlaylistService } from 'src/app/shared/services/get-playlist.service';

@Component({
  selector: 'app-input-section',
  templateUrl: './input-section.component.html',
  styleUrls: ['./input-section.component.css'],
})
export class InputSectionComponent implements OnInit {
  constructor(
    private route: Router,
    private recipeService: PostUrlService,
    private playlistService: GetPlaylistService
  ) {}
  @Output() spinner = new EventEmitter<boolean>();
  ngOnInit(): void {}
  onSubmit(formData: NgForm) {
    this.recipeService.postUrl(formData.form.value).subscribe((recipeData) => {
      this.playlistService.playlistId = recipeData.playlistId;
      this.route.navigate([
        `recipe/${recipeData.id}`,
        `${this.playlistService.playlistId}`,
      ]);
      this.spinner.emit(true);
    });
  }
}
