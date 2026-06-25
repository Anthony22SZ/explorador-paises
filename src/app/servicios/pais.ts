import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pais {
  private http = inject(HttpClient);
  
  // URL base apuntando al subdominio correcto
  private apiUrl = 'https://api.restcountries.com/countries/v5'; 
  private apiKey = 'rc_live_1c867e746b884d31a9bd2f0e4c35f551';

  buscarPaisPorNombre(nombre: string): Observable<any> {
    // 👈 Enviamos la llave concatenada directamente en la URL para evitar las peticiones OPTIONS (Preflight)
    return this.http.get<any>(`${this.apiUrl}?q=${nombre}&key=${this.apiKey}`);
  }
}