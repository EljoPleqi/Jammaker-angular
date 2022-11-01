import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output,
} from '@angular/core';
import { PostUrlService } from 'src/app/shared/services/post-url.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetUserService } from 'src/app/shared/services/get-user.service';

@Component({
  selector: 'app-scrapper-input-section',
  templateUrl: './scrapper-input-section.component.html',
  styleUrls: ['./scrapper-input-section.component.css'],
})
export class ScrapperInputSectionComponent implements OnInit, OnDestroy {
  @Output() spinner = new EventEmitter<boolean>();
  userId: number | undefined;
  playlist: string = '';
  options: string[] = [
    'rock',
    'pop',
    'uk pop',
    'modern rock',
    'elector pop',
    'indie pop',
  ];

  scrapperSub!: Subscription;
  scrapperData!: FormGroup;

  constructor(
    private route: Router,
    private recipeService: PostUrlService,
    private fetchUser: GetUserService
  ) {}

  ngOnInit(): void {
    this.scrapperData = new FormGroup({
      url: new FormControl(''),
      genre: new FormControl('pop'),
    });

    this.fetchUser.user$.subscribe((user) => (this.userId = user?.id));
  }

  onSubmit() {
    this.scrapperSub = this.recipeService
      .postUrl(this.scrapperData.value)
      .subscribe((recipeData) => {
        console.log(recipeData);
        this.route.navigate([
          `/cookbook/${this.userId}/recipe/${recipeData.id}`,
        ]);
        this.spinner.emit(true);
      });
  }

  ngOnDestroy() {
    // this.scrapperSub.unsubscribe();
  }
}
