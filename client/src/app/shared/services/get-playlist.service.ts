import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetPlaylistService {
  playlistId: string = '';
  constructor() {}
}
