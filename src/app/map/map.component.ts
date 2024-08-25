import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: L.Map;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const userLatLng: L.LatLngExpression = [lat, lng];

        this.map = L.map('map').setView(userLatLng, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        L.marker(userLatLng).addTo(this.map)
          .bindPopup('Tu ubicación actual')
          .openPopup();
      }, error => {
        console.error('Error obteniendo la ubicación', error);
        this.showDefaultMap();
      });
    } else {
      console.warn('Geolocalización no soportada por este navegador.');
      this.showDefaultMap();
    }
  }

  private showDefaultMap(): void {
    // Coordenadas predeterminadas si la geolocalización falla
    const defaultLatLng: L.LatLngExpression = [4.7110, -74.0721];
    this.map = L.map('map').setView(defaultLatLng, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker(defaultLatLng).addTo(this.map)
      .bindPopup('Ubicación predeterminada')
      .openPopup();
  }
}
