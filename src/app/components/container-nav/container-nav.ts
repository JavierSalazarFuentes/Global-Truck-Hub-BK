import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Logo } from '../logo/logo';
import { NavButton } from '../nav-button/nav-button';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-container-nav',
  standalone: true,
  imports: [Logo, NavButton, CommonModule, RouterModule],
  templateUrl: './container-nav.html',
  styleUrl: './container-nav.css',
})
export class ContainerNav implements OnInit, OnDestroy {
  usuarioActual: any = null;
  menuAbierto = false;
  private authSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Asignamos correctamente la suscripción a la variable authSub
    this.authSub = this.authService.currentUser$.subscribe((user) => {
      if (user && (user.nombre || user.usuario)) {
        this.usuarioActual = user;
      } else {
        this.usuarioActual = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
