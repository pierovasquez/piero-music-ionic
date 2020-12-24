import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage {

  songs: any[];
  title: string;
  constructor(
    private navParams: NavParams,
    private modalControler: ModalController
  ) { }

  // This function calls when the html of the page loaded
  ionViewDidEnter() {
    this.songs = this.navParams.data.songs;
    this.title = this.navParams.data.title;
  }

  async selectSong(song) {
    // This send the song to the component who called the SongsModal
    await this.modalControler.dismiss(song);
  }

}
