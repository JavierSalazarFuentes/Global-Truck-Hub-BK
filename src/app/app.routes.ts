import { Routes } from '@angular/router';
import { HomeContainer } from './modules/home-container/home-container';
import { ComponenteCatalogo } from './modules/componente-catalogo/componente-catalogo';
import { ComponenteCotizacion } from './modules/componente-cotizacion/componente-cotizacion';
import { ContactoContainer } from './modules/contacto-container/contacto-container';
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeContainer },

  { path: 'catalogo', component: ComponenteCatalogo },

  { path: 'cotizacion', component: ComponenteCotizacion },

  { path: 'contacto', component: ContactoContainer },

  { path: 'login', component: LoginComponent },

  { path: 'registro', component: RegistroComponent },

  { path: '**', redirectTo: 'home' }, // <-- El comodín siempre va al final de último
];
