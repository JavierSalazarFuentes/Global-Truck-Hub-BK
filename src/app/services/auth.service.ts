import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://centro-global-camiones.onrender.com/api';
  private apiUrl = `${this.baseUrl}/login`;
  private registroUrl = `${this.baseUrl}/registro`;

  // BehaviorSubject usa el método seguro optimizado
  private currentUserSubject = new BehaviorSubject<any>(this.obtenerUsuarioDeStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 🔍 CORRECCIÓN: Validamos que exista tanto el usuario como el token,
  // y que el token tenga el formato correcto de un JWT (3 partes separadas por puntos).
  private obtenerUsuarioDeStorage() {
    const guardado = sessionStorage.getItem('usuario');
    const token = sessionStorage.getItem('token');

    if (!guardado || guardado === 'undefined' || guardado === 'null' || !token) {
      sessionStorage.removeItem('usuario');
      sessionStorage.removeItem('token');
      return null;
    }

    try {
      // Verificamos estructura básica del JWT (header.payload.signature)
      const partesToken = token.split('.');
      if (partesToken.length !== 3) {
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('token');
        return null;
      }

      const usuario = JSON.parse(guardado);

      // Validamos que sea un objeto real y tenga propiedades válidas
      if (usuario && typeof usuario === 'object' && (usuario.nombre || usuario.usuario)) {
        return usuario;
      } else {
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('token');
        return null;
      }
    } catch (e) {
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
