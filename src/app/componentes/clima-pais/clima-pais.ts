import { Component, signal, OnInit, inject, input } from '@angular/core'; // 👈 Importamos 'input'
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ClimaService } from '../../servicios/clima';

import { Pais } from '../../servicios/pais';
import { BotonAccionComponent } from '../boton-accion/boton-accion';

@Component({
  selector: 'app-clima-pais',
  standalone: true,
  imports: [RouterLink, BotonAccionComponent],
  templateUrl: './clima-pais.html',
  styleUrl: './clima-pais.css'
})
export class ClimaPaisComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private paisService = inject(Pais);
  private climaService = inject(ClimaService);

  // 1. NUEVO: Declaramos el input para que el modal le inyecte el país
  pais = input<any>(null);

  nombre = signal<string>('');
  datosPais = signal<any>(null);
  datosClima = signal<any>(null);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);
  enModal = input<boolean>(false);

  ngOnInit() {
    // 2. MODIFICADO: Si los datos vienen desde el modal (Input)
    if (this.pais()) {
      const codigo = this.pais().codes?.alpha_2|| this.pais().nombre;
      this.nombre.set(codigo);
      this.cargarDatos();
    } 
    // 3. RESPALDO: Si entra de forma independiente por URL (Ruta)
    else {
      const codigoPais = this.route.snapshot.paramMap.get('nombre');
      if (codigoPais) {
        this.nombre.set(codigoPais);
        this.cargarDatos();
      } else {
        this.error.set('No se especificó un país.');
        this.cargando.set(false);
      }
    }
  }

  cargarDatos() {
    this.paisService.buscarPorCodigo(this.nombre()).subscribe({
      next: (res) => {
        if (res?.data?.objects?.length > 0) {
          const pais = res.data.objects[0];
          this.datosPais.set(pais);
          const lat = pais.coordinates?.lat;
          const lng = pais.coordinates?.lng;
          if (lat && lng) {
            this.cargarClima(lat, lng);
          } else {
            this.error.set('No se encontraron coordenadas para este país.');
            this.cargando.set(false);
          }
        } else {
          this.error.set('País no encontrado.');
          this.cargando.set(false);
        }
      },
      error: () => {
        this.error.set('Error al obtener datos del país.');
        this.cargando.set(false);
      }
    });
  }

  cargarClima(lat: number, lng: number) {
    this.climaService.getClima(lat, lng).subscribe({
      next: (res) => {
        this.datosClima.set(res.current);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al obtener el clima.');
        this.cargando.set(false);
      }
    });
  }
}