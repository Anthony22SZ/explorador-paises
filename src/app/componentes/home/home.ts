import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { ListasPaisesComponent } from '../listas-paises/listas-paises';
import { ModalPaisComponent } from '../modal-pais/modal-pais';
import { Pais } from '../../servicios/pais';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListasPaisesComponent, ModalPaisComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private paisService = inject(Pais);
  private busqueda$ = new Subject<string>();
  private subBusqueda?: Subscription;

  paisesEncontrados = signal<any[]>([]);
  paisSeleccionado = signal<any>(null);
  modalVisible = signal<boolean>(false);
  tipoModal = signal<'detalle' | 'clima' | null>(null);

  ngOnInit() {
    this.subBusqueda = this.busqueda$.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      filter(termino => termino.length >= 3)
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
        if (res?.data?.objects) {
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
              nombre: pais.names?.translations?.spa?.common || 'Sin nombre',
              nombreOficial: pais.names?.translations?.spa?.official || '',
              region: pais.region,
              flag: pais.flag,
              codes: pais.codes,
              coordinates: pais.coordinates
            }));

          this.paisesEncontrados.set(paisesLimpios);
        } else {
          this.paisesEncontrados.set([]);
        }
      },
      error: () => {
        this.paisesEncontrados.set([]);
      }
    });
  }

  seleccionarPais(pais: any) {
    this.paisSeleccionado.set(pais);
  }

  abrirDetalle(pais: any) {
    this.paisSeleccionado.set(pais);
    this.tipoModal.set('detalle');
    this.modalVisible.set(true);
  }

  abrirClima(pais: any) {
    this.paisSeleccionado.set(pais);
    this.tipoModal.set('clima');
    this.modalVisible.set(true);
  }

  cerrarModal() {
    this.modalVisible.set(false);
    this.tipoModal.set(null);
  }
}