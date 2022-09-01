import { Component, Input, OnInit } from '@angular/core';
import { map, switchMap, take } from 'rxjs';
import { PlaylistData } from 'src/app/shared/interfaces/playlist.model';
import { RecipeData } from 'src/app/shared/interfaces/recipe.model';
import { GetPlaylistDataService } from 'src/app/shared/services/get-playlist-data.service';
import { NewPlaylistService } from 'src/app/shared/services/new-playlist.service';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  @Input() recipeData!: RecipeData;
  playlistId: string = ''
  playlistData!: PlaylistData
  faArrows = faArrowsRotate;
  faClock = faClock


  constructor(
    private newPlaylist: NewPlaylistService,
    private getPlaylistData: GetPlaylistDataService,
  ) {}

  ngOnInit(): void {
    this.getPlaylistData
      .onGetData(this.recipeData.playlistId).pipe(take(1))
      .subscribe((data) => {
        this.playlistData = data;
      });
  }
  generateNewPlaylist() {
    console.log('click');
    this.newPlaylist
      .generate(this.recipeData.id)
      .pipe(
        switchMap((recipeData) => {
          console.log(recipeData);
          this.playlistId = recipeData.playlistId;
          return this.getPlaylistData.onGetData(recipeData.playlistId);
        }),
        map((data) => {
          this.playlistData = data;
          console.log(data);
        })
      )
      .pipe(take(1))
      .subscribe();
  }
}
