import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [],
  templateUrl: './home-container.html',
  styleUrl: './home-container.css',
})
export class HomeContainer {

  constructor(private router: Router) {}

  IrCatalogo() {
    this.router.navigate(['/catalogo']);
  }
}

