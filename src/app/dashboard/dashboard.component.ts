import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public pieChartData: any[] = [];
  public pieChartView: [number, number] = [700, 400];
  public colorScheme = 'vivid'; // Esquema de colores

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:3000/api/statistics').subscribe(data => {
      // Procesa los datos y configura el gráfico
      this.pieChartData = [
        {
          name: 'Visitas Totales',
          value: +data.reduce((acc, item) => acc + parseFloat(item.total_visits), 0)
        },
        {
          name: 'Tiempo Promedio de Carga',
          value: +data.reduce((acc, item) => acc + parseFloat(item.average_load_time), 0) / data.length
        },
        {
          name: 'Tasa de Rebote Promedio',
          value: +data.reduce((acc, item) => acc + parseFloat(item.average_bounce_rate), 0) / data.length
        }
      ];
    }, error => {
      console.error('Error al obtener datos', error);
    });
  }
}
