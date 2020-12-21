import { Component } from '@angular/core';
import { MusicService } from '../services/music.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };

  artists = [{}, {}, {}, {}, {}];
  songs: any[] = [];
  albums: any[] = [];

  constructor(
    private musicService: MusicService
  ) { }

  ionViewDidEnter() {
    this.musicService.getNewReleases().subscribe(newReleases => {
      console.log('relesaes', newReleases);
      this.artists = newReleases.albums.items;
      this.songs = newReleases.albums.items.filter(e => e.album_type === 'single');
      this.albums = newReleases.albums.items.filter(e => e.album_type === 'album');
    });
  }

}
