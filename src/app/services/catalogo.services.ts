import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Servicio para manejar las operaciones relacionadas con el catálogo
@Injectable({
  // Inyecta HttpClient para realizar solicitudes HTTP
  providedIn: 'root'
})
// Servicio para manejar las operaciones relacionadas con el catálogo
export class CatalogoService {
  // URL de la API donde se maneja el catálogo
  private apiUrl = 'http://localhost:3000/api/catalogo';

  constructor(private http: HttpClient) {}
// Método para obtener el catálogo, devuelve un Observable con la respuesta
  getCatalogo(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
