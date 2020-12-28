import { Component, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { Plugins } from '@capacitor/core';
import { MusicService } from '../services/music.service';
const { Geolocation } = Plugins;

const bicycleIcon = Leaflet.icon({
  iconUrl: '../assets/img/bicycle.png',
  iconSize: [38, 95], // size of the icon
  iconAnchor: [22, 94],  // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage implements OnDestroy {
  map: Leaflet.Map;
  currentCenter: { lat, lng };
  coordinates: number[] = [];
  isSearching = false;
  song;
  songs;
  nameSearch;
  currentSong: HTMLAudioElement;
  constructor(
    private musicService: MusicService
  ) { }

  async ionViewDidEnter() {
    await this.getCurrentPosition();
    this.leafletMap();
    this.watchPosition();
  }

  private async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates) {
      this.currentCenter = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
    }
  }

  private leafletMap() {
    if (this.currentCenter) {
      this.map = Leaflet.map('mapId').setView([this.currentCenter.lat, this.currentCenter.lng], 10);
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Piero Vasquez @ Angular LeafLet',
      }).addTo(this.map);
      this.addMarker();
      // Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

      // antPath([[43.1712601, -2.7847741], [42.1712601, -2.7847742]],
      //   { color: '#FF0000', weight: 5, opacity: 0.6 })
      //   .addTo(this.map);
    }
  }

  watchPosition() {
    Geolocation.watchPosition({}, position => {
      this.currentCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.map.setView([this.currentCenter.lat, this.currentCenter.lng], 10);
      this.addMarker();
    });
  }

  private showPopup() {
    Leaflet.popup()
      .setLatLng([this.currentCenter.lat, this.currentCenter.lng])
      .setContent('Here you are')
      .openOn(this.map);
  }

  private addMarker() {
    Leaflet.marker([this.currentCenter.lat, this.currentCenter.lng], { icon: bicycleIcon })
      .addTo(this.map)
      .bindPopup('Here you are')
      .openPopup();
  }

  getTracks(keywords: string) {
    if (keywords.length > 0) {
      this.isSearching = true;
      this.musicService.searchTracks(keywords).subscribe(async resp => {
        this.isSearching = false;
        this.songs = await resp.tracks.items.filter((item: any) => item.preview_url);
        if (this.songs.length === 0) {
          this.nameSearch = keywords;
        } else {
          this.nameSearch = '';
        }
      });
    } else {
      this.songs = [];
    }
  }

  play(song) {
    if (this.currentSong) {
      this.pause();
    }
    this.song = song;
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.onended = (ev) => this.song.isPlaying = false;
    this.song.isPlaying = true;
  }

  pause() {
    if (this.currentSong) {
      this.currentSong.pause();
      this.song.isPlaying = false;
    }
  }

  onCancelOrClear() {
    this.pause();
    this.songs = [];
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
