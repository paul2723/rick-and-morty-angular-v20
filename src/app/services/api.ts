import { Injectable, inject, signal } from '@angular/core'; // Asegúrate de importar Injectable
import { HttpClient } from '@angular/common/http';
import { Character, ApiResponse } from '../models/character';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // <-- ¡ESTA LÍNEA ES FUNDAMENTAL!
})
export class Api {
  // ✅ URL base de la API
  private readonly API_URL: string = 'https://rickandmortyapi.com/api/character';

  // ✅ Inyectar HttpClient
  private readonly http = inject(HttpClient);

  // ✅ Señal privada para manejar el estado de los personajes
  private charactersSignal = signal<Character[]>([]);

  // ✅ Señal pública de solo lectura
  public readonly characters = this.charactersSignal.asReadonly();

  // ✅ Método para obtener todos los personajes
  public getCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API_URL).pipe(
      tap(response => this.charactersSignal.set(response.results))
    );
  }

  // ✅ Método para buscar personajes por nombre
  public searchCharacters(name: string): Observable<ApiResponse> {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return this.getCharacters(); // Si está vacío, retornar todos
    }

    const searchUrl = `${this.API_URL}?name=${encodeURIComponent(trimmedName)}`;

    return this.http.get<ApiResponse>(searchUrl).pipe(
      tap(response => this.charactersSignal.set(response.results))
    );
  }
}