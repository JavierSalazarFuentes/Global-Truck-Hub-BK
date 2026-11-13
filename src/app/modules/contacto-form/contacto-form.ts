import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto-form.html',
  styleUrl: './contacto-form.css',
})
export class ContactoForm {
  constructor(private router: Router){}
  enviarFormulario(){
    alert('Mensaje enviado correctamente')
    this.router.navigate(['/home']);
  }
}
