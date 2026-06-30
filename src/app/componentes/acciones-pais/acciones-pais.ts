import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-acciones-pais',
  standalone: true,
  imports: [],
  template: `
    <div style="display: flex; gap: 10px; margin-left: auto;">
      <button 
        (click)="verDetalle()"
        class="btn-detalle">
        Detalle
      </button>
      <button 
        (click)="verClima()"
        class="btn-clima">
        Clima
      </button>
    </div>
  `,
  styles: [`
    button {
      padding: 6px 14px;
      border: none;
      border-radius: 20px;
      font-weight: 600;
      cursor: pointer;
      font-size: 0.85rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .btn-detalle {
      background: linear-gradient(135deg, #007bff, #6610f2);
      color: white;
    }
    .btn-clima {
      background: linear-gradient(135deg, #28a745, #20c997);
      color: white;
    }
  `]
})
export class AccionesPaisComponent {
  pais = input.required<any>();
  clickDetalle = output<any>();
  clickClima = output<any>();

  verDetalle() {
    this.clickDetalle.emit(this.pais());
  }

  verClima() {
    this.clickClima.emit(this.pais());
  }
}