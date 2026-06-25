import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccionesPaisComponent } from '../acciones-pais/acciones-pais';

@Component({
  selector: 'app-listas-paises',
  standalone: true,
  imports: [CommonModule, AccionesPaisComponent],
  templateUrl: './listas-paises.html',
  styleUrl: './listas-paises.css',
})
export class ListasPaisesComponent {
  @Input() paises: any[] = [];
  @Output() alSeleccionarPais = new EventEmitter<any>();

  seleccionar(pais: any) {
    this.alSeleccionarPais.emit(pais);
  }
}