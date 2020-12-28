import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as dataArtists from '../../assets/artists.json';
@Injectable()
export class MusicService {

  constructor(
    private http: HttpClient
  ) { }

  getArtists() {
    return dataArtists.items;
  }

  getArtistTopTracks(artistId): Promise<any> {
    return this.http.get(`https://platzi-music-api.herokuapp.com/artists/${artistId}/top-tracks?country=ES`).toPromise();
  }

  getAlbumTracks(albumId): Promise<any> {
    return this.http.get(`https://platzi-music-api.herokuapp.com/albums/${albumId}/tracks?country=ES`).toPromise();
  }

  getNewReleases(): Observable<any> {
    return this.http.get('https://platzi-music-api.herokuapp.com/browse/new-releases');
  }

  searchTracks(keywords): Observable<any> {
    return this.http.get<any>(`https://platzi-music-api.herokuapp.com/search?q=${keywords}&type=track`);
}
}
