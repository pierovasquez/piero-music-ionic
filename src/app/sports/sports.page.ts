import { Component, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage implements OnDestroy{
  map: Leaflet.Map;

  constructor() { }

  ionViewDidEnter() {
    this.leafletMap();
  }

  private leafletMap() {
    // this.map = Leaflet.map('mapId').setView([28.644800, 77.216721], 5);
    // Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: 'edupala.com © Angular LeafLet',
    // }).addTo(this.map);

    // Leaflet.marker([28.6, 77]).addTo(this.map).bindPopup('Delhi').openPopup();
    // Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

    // antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
    //   { color: '#FF0000', weight: 5, opacity: 0.6 })
    //   .addTo(this.map);
    this.map = Leaflet.map('mapId').setView([43.1712601, -2.7847741], 5);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Piero Vasquez @ Angular LeafLet',
    }).addTo(this.map);

    Leaflet.marker([43.1712601, -2.7847741]).addTo(this.map).bindPopup('Igorre').openPopup();
    // Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

    antPath([[43.1712601, -2.7847741], [42.1712601, -2.7847742]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map);
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
