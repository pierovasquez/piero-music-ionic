import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';


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

  artists: any[] = [];
  songs: any[] = [];
  albums: any[] = [];
  song = {} as any;
  newTime;
  currentSong: HTMLAudioElement = {} as HTMLAudioElement;
  constructor(
    private musicService: MusicService,
    private modalController: ModalController
  ) { }

  ionViewDidEnter() {
    this.musicService.getNewReleases().subscribe(newReleases => {
      this.artists = this.musicService.getArtists();
      this.songs = newReleases.albums.items.filter(e => e.album_type === 'single');
      this.albums = newReleases.albums.items.filter(e => e.album_type === 'album');
    });
  }

  async showSongs(artist) {
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name
      }
    });
    modal.onDidDismiss().then(dataReturned => {
      console.log('dataReturned', dataReturned);
      if (dataReturned && dataReturned.data) {
        this.song = dataReturned.data;
      }
    });
    return await modal.present();
  }

  play() {
    // There we are using the native API of the browser so we can handle songs and audio
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('timeupdate', () => {
      this.newTime = (this.currentSong.currentTime / this.currentSong.duration);
    });
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time = '0.00') {
    if (time) {
      const partTime = parseInt(time.toString().split('.')[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length === 1) {
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds;
    }
  }
}
