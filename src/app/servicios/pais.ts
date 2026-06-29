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
  private apiKey = 'rc_live_d7f8799690234439ae77cc01bf99ad91';

  buscarPaisPorNombre(nombre: string): Observable<any> {
    return this.http.get<any>(
        `${this.apiUrl}?q=${nombre}&key=${this.apiKey}&response_fields=names.translations.spa,flag,region,codes`
    );
}
}