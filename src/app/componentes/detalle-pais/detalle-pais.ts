import { Component, inject, signal, OnInit, input } from '@angular/core'; // 👈 Importamos 'input'
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Pais } from '../../servicios/pais';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detalle-pais.html',
  styleUrl: './detalle-pais.css'
})
export class DetallePaisComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private paisService = inject(Pais);

  // 1. NUEVO: Declaramos el input que viene desde el modal
  pais = input<any>(null); 

  nombre = signal<string>('');
  datosPais = signal<any>(null);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);
  enModal = input<boolean>(false);

  ngOnInit() {
    // 2. MODIFICADO: Primero verificamos si los datos vienen desde el INPUT (Modal)
if (this.pais()) {
    console.log('País recibido:', this.pais())
    console.log('alpha_2:', this.pais().codes?.alpha_2)
    const identificador = this.pais().codes?.alpha_2;
    this.nombre.set(identificador);
    this.cargarDetalleDelPais();
}
    // 3. RESPALDO: Si no hay input, buscamos en la URL (Ruta original)
    else {
      const nombreParam = this.route.snapshot.paramMap.get('nombre');
      if (nombreParam) {
        this.nombre.set(nombreParam);
        this.cargarDetalleDelPais();
      } else {
        this.error.set('No se especificó un país para mostrar detalles.');
        this.cargando.set(false);
      }
    }
  }

  cargarDetalleDelPais() {
    this.cargando.set(true);
    this.error.set(null);

    this.paisService.buscarPorCodigo(this.nombre()).subscribe({
      next: (respuesta) => {
        if (respuesta?.data?.objects?.length > 0) {
          this.datosPais.set(respuesta.data.objects[0]);
        } else {
          this.error.set('No se encontraron detalles para este país.');
        }
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al conectar.');
        this.cargando.set(false);
      }
    });
  }
}