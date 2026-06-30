import { Component, input, output } from '@angular/core';
import { DetallePaisComponent } from '../detalle-pais/detalle-pais';
import { ClimaPaisComponent } from '../clima-pais/clima-pais';

@Component({
  selector: 'app-modal-pais',
  standalone: true,
  imports: [DetallePaisComponent, ClimaPaisComponent],
  templateUrl: './modal-pais.html',
  styleUrl: './modal-pais.css'
})
export class ModalPaisComponent {
  pais = input.required<any>();
  tipo = input.required<'detalle' | 'clima' | null>();
  cerrar = output<void>();

  onCerrar() {
    this.cerrar.emit();
  }
}