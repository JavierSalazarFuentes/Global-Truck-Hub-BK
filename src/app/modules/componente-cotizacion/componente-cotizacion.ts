import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FichaTecnica } from '../ficha-tecnica/ficha-tecnica';

@Component({
  selector: 'app-componente-cotizacion',
  standalone: true,
  imports: [CommonModule, FormsModule, FichaTecnica],
  templateUrl: './componente-cotizacion.html',
  styleUrl: './componente-cotizacion.css',
})
export class ComponenteCotizacion implements OnInit {
  // 🔗 URL base unificada apuntando a tu backend en Render
  private apiUrl = 'https://centro-global-camiones.onrender.com/api/cotizacion';

  camionSeleccionado = {
    precio: 280000000,
  };

  cuotaInicial = 0;
  mesesPlazo = 12;
  iva = 0;
  totalConIva = 0;
  valorCuota = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ejecutarCalculos();
    this.verificarSeguridadBackend(); // Validación de JWT contra el servidor real
  }

  // 🔴 Validación de seguridad conectada a Render
  verificarSeguridadBackend(): void {
    this.http.get(this.apiUrl).subscribe({
      next: (response: any) => {
        console.log('Token válido y autorizado por el servidor:', response);
      },
      error: (err) => {
        // Si alteras el token, el backend en Render responderá 401 y entrará aquí
        if (err.status === 401) {
          console.error('¡Atrapado! Error 401: El token fue alterado o es inválido.');
          alert('Tu sesión ha expirado o el token fue manipulado. Serás redirigido.');
          this.router.navigate(['/login']); // Te saca de la vista de inmediato
        } else {
          console.error('Otro error de conexión:', err);
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
