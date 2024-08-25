import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { ToastrModule } from 'ngx-toastr'; // Importa ToastrModule
import { NgxChartsModule } from '@swimlane/ngx-charts'; // Importa NgxChartsModule

// Importa los componentes que has creado
import { AppComponent } from './app.component';
import { CaptureFormComponent } from './capture-form/capture-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';

// Define las rutas de la aplicación
const appRoutes: Routes = [
  { path: '', redirectTo: '/capture', pathMatch: 'full' },
  { path: 'capture', component: CaptureFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'map', component: MapComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CaptureFormComponent,
    DashboardComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes), // Configura las rutas en el módulo
    BrowserAnimationsModule, // Importa BrowserAnimationsModule para Toastr
    ToastrModule.forRoot({ // Configura ToastrModule
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      preventDuplicates: true,
    }),
    NgxChartsModule // Agrega NgxChartsModule para gráficos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
