import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-boton-accion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './boton-accion.html',
  styleUrl: './boton-accion.css'
})
export class BotonAccionComponent {
  ruta = input.required<any[]>()
  texto = input.required<string>()
  color = input<string>('azul')
}