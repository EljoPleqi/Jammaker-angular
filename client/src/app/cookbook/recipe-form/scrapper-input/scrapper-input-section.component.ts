import { Component, EventEmitter, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { PostUrlService } from 'src/app/shared/services/post-url.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scrapper-input-section',
  templateUrl: './scrapper-input-section.component.html',
  styleUrls: ['../recipe-form.component.scss'],
})
export class ScrapperInputSectionComponent implements OnInit, OnDestroy {
  @Output() spinner = new EventEmitter<boolean>();
  @Input() isMeal: boolean = true;

  isLoading: boolean = true;

  userId?: number;
  url: string = '';
  genres: string[] = [];
  moodTag: string = '';

  closeIcon = faClose;

  scrapperSub: Subscription = new Subscription();
  userSub: Subscription = new Subscription();

  constructor(private route: Router, private recipeService: PostUrlService, private fetchUser: GetUserService) {}

  ngOnInit(): void {
    this.userSub = this.fetchUser.user$.subscribe((user) => {
      this.userId = user?.id;
      this.isLoading = false;
    });
  }

  addMoodTag() {
    this.genres.push(this.moodTag);
    this.moodTag = '';
  }

  onSubmit() {
    this.isLoading = true;
    this.scrapperSub = this.recipeService.postUrl({ url: this.url, genre: this.genres.join('%20') }, this.isMeal).subscribe((recipeData) => {
      this.isLoading = false;
      this.route.navigate([`/cookbook/${this.userId}/${this.isMeal ? 'recipes' : 'condiments'}/${recipeData.id}`]);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.scrapperSub.unsubscribe();
  }
}
