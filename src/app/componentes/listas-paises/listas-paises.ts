import { Component, input, output } from '@angular/core';
import { AccionesPaisComponent } from '../acciones-pais/acciones-pais'; // Asegura la importación

@Component({
  selector: 'app-listas-paises',
  standalone: true,
  imports: [AccionesPaisComponent], // 👈 Asegúrate de que esté aquí
  templateUrl: './listas-paises.html'
})
export class ListasPaisesComponent {
  paises = input<any[]>([]);

  // 🚀 Eventos que van hacia el Home
  alVerDetalle = output<any>();
  alVerClima = output<any>();

  verDetalle(pais: any) {
    this.alVerDetalle.emit(pais); // Lo eleva al Home
  }

  verClima(pais: any) {
    this.alVerClima.emit(pais); // Lo eleva al Home
  }
}