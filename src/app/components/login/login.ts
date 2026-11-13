import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Ajusta la ruta según dónde guardes tu servicio
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  mensajeError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    this.mensajeError = '';

    this.authService.login({ usuario: this.usuario, password: this.password }).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Login exitoso:', response.usuario);

          //Enviamos el usuario y el token recibido del backend
          this.authService.guardarUsuarioSesion(response.usuario || response, response.token);

          // Redirige al catálogo
          this.router.navigate(['/catalogo']);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.mensajeError = 'Usuario o contraseña incorrectos.';
        } else {
          this.mensajeError = 'Ocurrió un error en el servidor. Inténtalo más tarde.';
        }
      },
    });
  }
}
