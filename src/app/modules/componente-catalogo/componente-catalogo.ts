import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para usar *ngFor y async pipe si lo requieres
import { TarjetaCamion } from '../../components/tarjeta-camion/tarjeta-camion';
import { CatalogoService } from '../../services/catalogo.services';

@Component({
  selector: 'app-componente-catalogo',
  standalone: true,
  imports: [CommonModule, TarjetaCamion],
  templateUrl: './componente-catalogo.html',
  styleUrl: './componente-catalogo.css',
})
export class ComponenteCatalogo implements OnInit {
  catalogo: any[] = [];

  constructor(
    private catalogoService: CatalogoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.catalogoService.getCatalogo().subscribe({
      next: (data) => {
        this.catalogo = data; // Recibe directo el array de categorías
        console.log('Catálogo cargado correctamente:', data);
        this.cdr.detectChanges(); // Forzar detección de cambios
      },
      error: (err) => {
        console.error('Error al conectar con el backend:', err);
      },
    });
  }
}
