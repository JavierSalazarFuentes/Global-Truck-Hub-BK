import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedesSocialesServices {
  // ERROR SOLUCIONADO: Se agregó 'bi bi-' antes del nombre de la red
public listaRedes = [
  { nombre: 'Facebook', icono: 'bi bi-facebook', url: '#', color: '#1877F2' },
  { nombre: 'Instagram', icono: 'bi bi-instagram', url: '#', color: '#E4405F' },
  { nombre: 'Twitter', icono: 'bi bi-twitter-x', url: '#', color: '#000000' },
  { nombre: 'YouTube', icono: 'bi bi-youtube', url: '#', color: '#FF0000' }
];
}
