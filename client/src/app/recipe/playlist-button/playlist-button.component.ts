import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { NewPlaylistService } from 'src/app/shared/services/new-playlist.service';

@Component({
  selector: 'app-playlist-button',
  templateUrl: './playlist-button.component.html',
  styleUrls: ['./playlist-button.component.css']
})
export class PlaylistButtonComponent implements OnInit {

  faArrows = faArrowsRotate
  recipeData = {id: ''}
  recipeSub!: Subscription

  constructor(private newPlaylist: NewPlaylistService, private route: ActivatedRoute) {
    this.recipeData.id = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
  }

  // TODO: make the call to the backend to generate the new playlist and then complete the observable
  generateNewPlaylist() {
    console.log("click");
    this.recipeSub = this.newPlaylist.generate(this.recipeData.id).subscribe(data => {
        console.log(data);
      // this.recipeSub.unsubscribe()
   })

  }
}
