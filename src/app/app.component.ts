import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  onSubmit(form: any): void {
    const data = form.value;
    console.log(data);

    // Aquí podrías agregar la lógica para enviar los datos a tu API usando HttpClient
    this.http.post('http://localhost:3000/api/data', data).subscribe(response => {
      console.log('Datos enviados', response);
    }, error => {
      console.error('Error al enviar los datos', error);
    });
  }
}
