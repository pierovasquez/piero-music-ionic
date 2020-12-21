import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class MusicService {

  constructor(
    private http: HttpClient
  ) { }

  getNewReleases(): Observable<any> {
    return this.http.get('https://platzi-music-api.herokuapp.com/browse/new-releases')
  }
}
