import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaylistData } from '../interfaces/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class GetPlaylistDataService {
  constructor(private http: HttpClient) {}

  onGetData(id: string | undefined) {
    return this.http.get<PlaylistData>(
      `http://localhost:3000/api/v1/playlists/${id}`,
      { withCredentials: true }
    );
  }
}
