import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ficha-tecnica',
  standalone: true,
  templateUrl: './ficha-tecnica.html',
  styleUrl: './ficha-tecnica.css'
})
export class FichaTecnica implements OnInit {

  modeloCamion: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.modeloCamion = this.route.snapshot.paramMap.get('modelo');
  }

  imprimirCotizacion(): void {
    window.print();
  }
}