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
  currentTime;
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
    const title = `${artist.name} - Top Tracks`;
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    const modal = await this.createSongsModalController(songs.tracks, title);
    this.onDidDismiss(modal);
    return await modal.present();
  }

  async showSongsOfAlbum(album) {
    const songs = await this.musicService.getAlbumTracks(album.id);
    const title = `${album.name} - Top Tracks`;
    const modal = await this.createSongsModalController(songs.items, title);
    this.onDidDismiss(modal);
    return await modal.present();
  }

  private createSongsModalController(songs, title) {
    return this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs,
        title
      }
    });
  }

  private onDidDismiss(modal) {
    modal.onDidDismiss().then(dataReturned => {
      if (dataReturned && dataReturned.data) {
        this.song = dataReturned.data;
        if (this.song.preview_url) {
          this.play();
        }
      }
    });
  }

  play() {
    // There we are using the native API of the browser so we can handle songs and audio
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.song.playing = true;
    this.currentSong.addEventListener('timeupdate', (ev) => {
      this.currentTime = this.currentSong.currentTime;
      this.newTime = (this.currentSong.currentTime / this.currentSong.duration);
    });
    this.currentSong.onended = (event) => {
      this.currentTime = '0.00';
      this.newTime = 0;
      this.song.playing = false;
    };
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
