import { Component } from '@angular/core';
import { PokemonService } from '../Services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent {
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {}
}
