import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { PostUrlService } from 'src/app/shared/services/post-url.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetUserService } from 'src/app/shared/services/get-user.service';

@Component({
  selector: 'app-scrapper-input-section',
  templateUrl: './scrapper-input-section.component.html',
  styleUrls: ['../recipe-form.component.scss'],
})
export class ScrapperInputSectionComponent implements OnInit {
  @Output() spinner = new EventEmitter<boolean>();
  @Input() isMeal: boolean = true;
  isLoading: boolean = true;

  userId: number | undefined;
  playlist: string = '';
  genres: string[] = ['rock', 'pop', 'blues', 'bossanova', 'brazil', 'breakbeat', 'british', 'folk', 'forro', 'french', 'funk', 'indie', 'indie-pop'];

  scrapperSub: Subscription = new Subscription();
  scrapperData: FormGroup;

  constructor(private route: Router, private recipeService: PostUrlService, private fetchUser: GetUserService) {
    this.scrapperData = new FormGroup({
      url: new FormControl(''),
      genre: new FormControl({ value: this.genres[0], disabled: !this.isMeal }),
    });
  }

  ngOnInit(): void {
    this.fetchUser.user$.subscribe((user) => {
      this.userId = user?.id;
      this.isLoading = false;
    });
  }

  changeGenre() {
    console.log(this.scrapperData.get('genre')?.value);
  }

  onSubmit() {
    this.isLoading = true;
    this.scrapperSub = this.recipeService.postUrl(this.scrapperData.value, this.isMeal).subscribe((recipeData) => {
      this.isLoading = false;
      this.route.navigate([`/cookbook/${this.userId}/${this.isMeal ? 'recipes' : 'condiments'}/${recipeData.id}`]);
    });
  }
}
