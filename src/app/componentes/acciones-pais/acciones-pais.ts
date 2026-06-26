import { Component, input } from '@angular/core';
import { BotonAccionComponent } from '../boton-accion/boton-accion';

@Component({
  selector: 'app-acciones-pais',
  standalone: true,
  imports: [BotonAccionComponent],
  template: `
    <div style="display: flex; gap: 10px; margin-left: auto;">
      <app-boton-accion 
        [ruta]="['/pais', pais().codes?.alpha_2, 'detalle']" 
        texto="Detalle"
        color="azul">
      </app-boton-accion>
      <app-boton-accion 
        [ruta]="['/pais', pais().codes?.alpha_2, 'clima']" 
        texto="Clima"
        color="verde">
      </app-boton-accion>
    </div>
  `
})
export class AccionesPaisComponent {
  pais = input.required<any>();
}