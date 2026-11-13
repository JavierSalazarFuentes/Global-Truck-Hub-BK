import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-button.html',
  styleUrl: './nav-button.css'
})
export class NavButton {
  link = input<string>('');
  texto = input<string>('');
}