import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acciones-pais',
  standalone: true,
  imports: [RouterLink],
template: `
    <div class="acciones-contenedor" style="display: flex; gap: 10px; margin-left: auto;">
        <button 
            [routerLink]="['/pais', pais().codes?.alpha_2, 'detalle']" 
            class="btn-accion btn-detalle">
            Detalle
        </button>
        <button 
            [routerLink]="['/pais', pais().codes?.alpha_2, 'clima']" 
            class="btn-accion btn-clima">
            Clima
        </button>
    </div>
`,
  styles: [`
    .acciones-contenedor {
      margin-left: auto; /* Empuja los botones hacia la extrema derecha de la fila */
    }
    .btn-accion {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    .btn-detalle {
      background-color: #007bff;
      color: white;
    }
    .btn-detalle:hover { background-color: #0056b3; }
    
    .btn-clima {
      background-color: #28a745;
      color: white;
    }
    .btn-clima:hover { background-color: #218838; }
  `]
})
export class AccionesPaisComponent {
  // Recibimos el objeto mapeado del país de manera estricta
  pais = input.required<any>();
}