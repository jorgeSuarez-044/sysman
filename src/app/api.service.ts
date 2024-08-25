import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000'; // URL de tu backend

  constructor(private http: HttpClient) { }

  // Obtener el número de visitas
  getTotalVisits(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/visits`);
  }

  // Obtener el tiempo promedio de carga
  getAverageLoadTime(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/load-time`);
  }

  // Obtener la tasa de rebote
  getBounceRate(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bounce-rate`);
  }

  // Obtener ubicaciones frecuentes
  getFrequentLocations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/locations`);
  }
}
