import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BotonAccionComponent } from '../boton-accion/boton-accion';
import { Pais } from '../../servicios/pais';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [RouterLink, CommonModule, BotonAccionComponent],
  templateUrl: './detalle-pais.html',
  styleUrl: './detalle-pais.css'
})
export class DetallePaisComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private paisService = inject(Pais);

  nombre = signal<string>('');
  datosPais = signal<any>(null);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    const nombreParam = this.route.snapshot.paramMap.get('nombre');
    if (nombreParam) {
      this.nombre.set(nombreParam);
      this.cargarDetalleDelPais();
    } else {
      this.error.set('No se especificó un país en la URL.');
      this.cargando.set(false);
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