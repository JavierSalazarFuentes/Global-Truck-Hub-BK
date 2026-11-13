import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css', 
})
export class RegistroComponent {
  nombre: string = '';
  usuario: string = '';
  password: string = '';
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onRegistro() {
    this.mensajeError = '';
    this.mensajeExito = '';

    this.authService
      .registro({ nombre: this.nombre, usuario: this.usuario, password: this.password })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.mensajeExito = '¡Registro exitoso! Redirigiendo al login...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);
          }
        },
        error: (err) => {
          if (err.error && err.error.mensaje) {
            this.mensajeError = err.error.mensaje;
          } else {
            this.mensajeError = 'Ocurrió un error al registrarse.';
          }
        },
      });
  }
}
