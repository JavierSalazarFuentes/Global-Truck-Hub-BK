import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // 👈 1. Importa HttpClient
import { Router } from '@angular/router'; // 👈 2. Importa Router (opcional para redirección)
import { FichaTecnica } from '../ficha-tecnica/ficha-tecnica';

@Component({
  selector: 'app-componente-cotizacion',
  standalone: true,
  imports: [CommonModule, FormsModule, FichaTecnica],
  templateUrl: './componente-cotizacion.html',
  styleUrl: './componente-cotizacion.css',
})
export class ComponenteCotizacion implements OnInit {
  camionSeleccionado = {
    precio: 280000000,
  };

  cuotaInicial = 0;
  mesesPlazo = 12;
  iva = 0;
  totalConIva = 0;
  valorCuota = 0;

  constructor(
    private http: HttpClient, // 👈 3. Inyéctalo en el constructor
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ejecutarCalculos();
    this.verificarSeguridadBackend(); // 👈 4. Llamamos a la validación de JWT aquí
  }

  // 🔴 ESTA ES LA FUNCIÓN QUE FUERZA LA PRUEBA DE FUEGO CON EL BACKEND
  verificarSeguridadBackend(): void {
    this.http.get('http://localhost:3000/api/cotizacion').subscribe({
      next: (response: any) => {
        console.log('Token válido y autorizado por el servidor:', response);
      },
      error: (err) => {
        // Aquí es donde el interceptor mandará el token dañado y el backend responderá 401
        if (err.status === 401) {
          console.error('¡Atrapado! Error 401: El token fue alterado o es inválido.');
          alert('Tu sesión ha expirado o el token fue manipulado. Serás redirigido.');
          this.router.navigate(['/login']); // Te saca de la vista de inmediato
        } else {
          console.error('Otro error:', err);
        }
      },
    });
  }

  ejecutarCalculos(): void {
    this.iva = this.camionSeleccionado.precio * 0.19;
    this.totalConIva = this.camionSeleccionado.precio + this.iva;

    const valorAFinanciar = this.totalConIva - this.cuotaInicial;

    if (this.mesesPlazo > 0) {
      this.valorCuota = valorAFinanciar / this.mesesPlazo;
    } else {
      this.valorCuota = 0;
    }

    if (valorAFinanciar < 0) {
      this.valorCuota = 0;
    }
  }
}
