import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClimaService } from '../../servicios/clima';

@Component({
  selector: 'app-clima-pais',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clima-pais.html',
  styleUrl: './clima-pais.css'
})
export class ClimaPaisComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private climaService = inject(ClimaService);

  nombre = signal<string>('');
  datosPais = signal<any>(null);
  datosClima = signal<any>(null);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    const codigoPais = this.route.snapshot.paramMap.get('nombre');
    if (codigoPais) {
      this.nombre.set(codigoPais);
      this.cargarDatos();
    } else {
      this.error.set('No se especificó un país.');
      this.cargando.set(false);
    }
  }

  cargarDatos() {
    const urlPais = `https://api.restcountries.com/countries/v5?codes.alpha_2=${this.nombre()}&key=rc_live_1c867e746b884d31a9bd2f0e4c35f551`;

    this.http.get<any>(urlPais).subscribe({
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