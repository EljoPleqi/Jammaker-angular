import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostUrlService } from 'src/app/shared/services/post-url.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-section',
  templateUrl: './input-section.component.html',
  styleUrls: ['./input-section.component.css'],
})
export class InputSectionComponent implements OnInit {
  @Output() spinner = new EventEmitter<boolean>();
  playlist: string = '';
  options: string[] = ['rock', 'pop'];

  scrapperData!: FormGroup;

  constructor(private route: Router, private recipeService: PostUrlService) {}

  ngOnInit(): void {
    this.scrapperData = new FormGroup({
      url: new FormControl(''),
      genre: new FormControl('pop'),
    });
  }

  onSubmit() {
    this.recipeService
      .postUrl(this.scrapperData.value)
      .subscribe((recipeData) => {
        this.route.navigate([
          `recipe/${recipeData.id}`,
          `${recipeData.playlistId}`,
        ]);
        this.spinner.emit(true);
      });
  }
}
