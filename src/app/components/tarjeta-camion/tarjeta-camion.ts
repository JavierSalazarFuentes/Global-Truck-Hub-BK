import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-camion',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './tarjeta-camion.html', // Ahora sí usará tu archivo HTML
  styleUrl: './tarjeta-camion.css', // Ahora sí usará tu archivo CSS
})
export class TarjetaCamion {
  camion = input.required<any>();

  constructor(private router: Router) {}
  ngOnInit() {
    console.log('Tarjeta de camión recibió los datos:', this.camion());
  }

  irACotizacion() {
    this.router.navigate(['/cotizacion']);
  }
}
