import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedesSocialesServices } from '../../services/redes-sociales';

@Component({
  selector: 'app-redes-sociales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './redes-sociales.html',
  styleUrl: './redes-sociales.css',
})
export class RedesSociales implements OnInit {

  public redes: any[] = [];

  constructor(private servicio: RedesSocialesServices) {}

  ngOnInit(): void {
    this.redes = this.servicio.listaRedes;
  }
}