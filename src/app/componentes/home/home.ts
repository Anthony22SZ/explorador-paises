import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListasPaisesComponent } from '../listas-paises/listas-paises';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ListasPaisesComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  paisesEncontrados = signal<any[]>([]);
  paisSeleccionado = signal<any | null>(null);


  private busqueda$ = new Subject<string>();
  private subBusqueda?: Subscription;

  private apiKey = 'rc_live_1c867e746b884d31a9bd2f0e4c35f551';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Configuramos el flujo reactivo
 this.subBusqueda = this.busqueda$.pipe(
    debounceTime(350),
    distinctUntilChanged(),
    filter(termino => termino.length > 0) // agrega esto
).subscribe(termino => {
    this.ejecutarPeticion(termino);
});
  }

  ngOnDestroy() {
    
    this.subBusqueda?.unsubscribe();
  }

alBuscar(event: any) {
    const termino = event.target.value?.trim() || '';

    if (termino === '') {
      this.paisesEncontrados.set([]);
      this.paisSeleccionado.set(null);
      this.busqueda$.next(''); // cancela cualquier debounce pendiente
      return;
    }

    this.busqueda$.next(termino);
}

private ejecutarPeticion(termino: string) {
  const url = `https://api.restcountries.com/countries/v5?q=${termino}&key=${this.apiKey}&response_fields=names.translations.spa,flag,region,codes`;

  this.http.get<any>(url).subscribe({
    next: (res) => {
      if (res && res.data && res.data.objects && res.data.objects.length > 0) {
        
        const normalizar = (texto: string) =>
          texto.toLowerCase()
               .normalize('NFD')
               .replace(/[\u0300-\u036f]/g, '');

        const terminoNormalizado = normalizar(termino);

        const paisesLimpios = res.data.objects
          .filter((pais: any) => {
            const nombreEspanol = normalizar(pais.names?.translations?.spa?.common || '');
            return nombreEspanol.includes(terminoNormalizado);
          })
          .map((pais: any) => ({
            nombre: pais.names?.translations?.spa?.common || 'País sin nombre',
            nombreOficial: pais.names?.translations?.spa?.official || 'Sin nombre oficial',
            region: pais.region,
            flag: pais.flag,
            codes: pais.codes
          }));

        this.paisesEncontrados.set(paisesLimpios);
      } else {
        this.paisesEncontrados.set([]);
      }
    },
    error: (err) => {
      this.paisesEncontrados.set([]);
      console.error('Error al buscar país:', err);
    }
  });
}

seleccionarPais(pais: any) {
    console.log('alpha_2:', pais.codes?.alpha_2)
    this.paisSeleccionado.set(pais);
}
}