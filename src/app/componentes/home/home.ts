import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListasPaisesComponent } from '../listas-paises/listas-paises';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Pais } from '../../servicios/pais';

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
  private paisService = inject(Pais);

  ngOnInit() {
    this.subBusqueda = this.busqueda$.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      filter(termino => termino.length > 0)
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
      this.busqueda$.next('');
      return;
    }

    this.busqueda$.next(termino);
  }

  private ejecutarPeticion(termino: string) {
    this.paisService.buscarPaisPorNombre(termino).subscribe({
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
    this.paisSeleccionado.set(pais);
  }
}