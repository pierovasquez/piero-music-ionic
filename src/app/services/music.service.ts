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

  getNewReleases(): Observable<any> {
    return this.http.get('https://platzi-music-api.herokuapp.com/browse/new-releases')
  }
}
