import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Character } from '../../models/character';
import { Api } from '../../services/api';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [FormsModule], // necesario para [(ngModel)]
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss',
})
export class CharacterListComponent implements OnInit {

  // ✅ Inyectar el servicio Api
  private readonly api = inject(Api);

  // ✅ Señal pública con los personajes
  public characters = this.api.characters;

  // ✅ Estado de la UI
  public searchTerm: string = '';
  public loading: boolean = false;
  public errorMessage: string = '';

  // ✅ Señal computada para saber si hay personajes
  public hasCharacters = computed(() => this.characters().length > 0);

  ngOnInit(): void {
    this.loadInitialCharacters();
  }

  // ✅ Cargar todos los personajes al inicio
  loadInitialCharacters(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.getCharacters()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        error: () => {
          this.errorMessage = 'Error al cargar los personajes.';
        }
      });
  }

  // ✅ Buscar personajes por nombre
  onSearch(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.searchCharacters(this.searchTerm)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        error: () => {
          this.errorMessage = 'No se encontraron personajes con ese nombre.';
        }
      });
  }

  onSearchKeyup(event: Event): void {
    const keyEvent = event as KeyboardEvent;
    if (keyEvent.key === 'Enter') {
      this.onSearch();
    }
  }
}

