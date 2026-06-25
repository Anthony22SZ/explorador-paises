import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home'; 
import { DetallePaisComponent } from './componentes/detalle-pais/detalle-pais';
import { ClimaPaisComponent } from './componentes/clima-pais/clima-pais';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pais/:nombre/detalle', component: DetallePaisComponent },
  { path: 'pais/:nombre/clima', component: ClimaPaisComponent },
  { path: '**', redirectTo: '' }
];