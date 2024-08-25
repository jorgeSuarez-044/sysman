import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-capture-form',
  templateUrl: './capture-form.component.html',
  styleUrls: ['./capture-form.component.css']
})
export class CaptureFormComponent implements OnInit {
  siteName: string = '';
  visits: number = 0;
  loadTime: number = 0; // Tiempo de carga en segundos
  bounceRate: number = 0;
  latitude: number = 0;
  longitude: number = 0;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getLocationName(this.latitude, this.longitude);
        this.calculateStatistics();
      }, error => {
        console.error('Error obteniendo la ubicación:', error);
      });
    } else {
      console.error('Geolocalización no es soportada por este navegador.');
    }

    this.calculateVisits();
  }

  getLocationName(lat: number, lon: number) {
    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

    this.http.get(geocodingUrl).subscribe((response: any) => {
      this.siteName = response.display_name || 'Desconocido';
    }, error => {
      console.error('Error obteniendo el nombre del sitio:', error);
      this.siteName = 'Desconocido';
    });
  }

  calculateStatistics() {
    this.loadTime = Math.floor(Math.random() * (10 - 1 + 1) + 1); // Tiempo de carga entre 1 y 10 segundos
    this.bounceRate = Math.floor(Math.random() * (60 - 20 + 1) + 20); // Tasa de rebote entre 20% y 60%
  }

  calculateVisits() {
    let visits = localStorage.getItem('visits');
    if (visits) {
      this.visits = parseInt(visits, 10) + 1;
    } else {
      this.visits = 1; // Primer visitante
    }
    localStorage.setItem('visits', this.visits.toString());
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const postData = {
        siteName: this.siteName,
        visits: this.visits,
        loadTime: this.loadTime,
        bounceRate: this.bounceRate,
        latitude: this.latitude,
        longitude: this.longitude
      };

      this.http.post('http://localhost:3000/api/data', postData).subscribe(response => {
        this.toastr.success('Los datos se guardaron correctamente.', 'Éxito');
      }, error => {
        console.error('Error saving data', error);
        this.toastr.error('Hubo un error al guardar los datos.', 'Error');
      });
    }
  }
}
