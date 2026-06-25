import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detalle-pais.html',
  styleUrl: './detalle-pais.css'
})
export class DetallePaisComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

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
    const url = `https://api.restcountries.com/countries/v5?codes.alpha_2=${this.nombre()}&key=rc_live_1c867e746b884d31a9bd2f0e4c35f551`;
    this.http.get<any>(url).subscribe({
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