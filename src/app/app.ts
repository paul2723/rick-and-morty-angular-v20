import { Component } from '@angular/core';
import { CharacterListComponent } from './components/character-list/character-list';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CharacterListComponent, FormsModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {}
