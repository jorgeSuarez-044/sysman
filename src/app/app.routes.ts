import { Routes } from '@angular/router';
import { CaptureFormComponent } from './capture-form/capture-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';

export const appRoutes: Routes = [
  { path: 'capture-form', component: CaptureFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'map', component: MapComponent },
  { path: '', redirectTo: '/capture-form', pathMatch: 'full' }
];
