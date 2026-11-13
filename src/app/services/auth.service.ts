import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';
  private registroUrl = 'http://localhost:3000/api/registro';

  // BehaviorSubject usa ahora el método seguro con sessionStorage
  private currentUserSubject = new BehaviorSubject<any>(this.obtenerUsuarioDeStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Método seguro que valida y limpia datos corruptos o incompletos del sessionStorage
  private obtenerUsuarioDeStorage() {
    const guardado = sessionStorage.getItem('usuario');

    if (!guardado || guardado === 'undefined' || guardado === 'null') {
      return null;
    }

    try {
      const usuario = JSON.parse(guardado);

      // Validamos que sea un objeto real y tenga propiedades válidas
      if (usuario && typeof usuario === 'object' && (usuario.nombre || usuario.usuario)) {
        return usuario;
      } else {
        // Si está incompleto, limpiamos la basura del sessionStorage inmediatamente
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('token');
        return null;
      }
    } catch (e) {
      // Si el JSON está dañado, también limpiamos todo
      sessionStorage.removeItem('usuario');
      sessionStorage.removeItem('token');
      return null;
    }
  }

  // Método que ejecuta la petición HTTP al backend de Express
  login(credenciales: { usuario: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credenciales);
  }

  // Método que guarda el usuario y el token recibido del backend en sessionStorage
  guardarUsuarioSesion(usuarioData: any, token?: string) {
    sessionStorage.setItem('usuario', JSON.stringify(usuarioData));
    if (token) {
      sessionStorage.setItem('token', token);
    }
    this.currentUserSubject.next(usuarioData);
  }

  // Método para cerrar sesión limpiando ambos elementos de sessionStorage
  logout() {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  registro(datos: { usuario: string; password: string; nombre?: string }): Observable<any> {
    return this.http.post<any>(this.registroUrl, datos);
  }
}
