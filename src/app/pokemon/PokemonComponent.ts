import { Component } from '@angular/core';
import { PokemonService } from '../Services/pokemon.service';
import { Pokemon } from '../Models/Pokemon';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent {
  pokemonList: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getAllPokemon().subscribe(
      (data: any) => {
        this.pokemonList = data.results.map((item: any) => ({
          name: item.name,
          url: item.url,
        }));
        console.log(this.pokemonList);
      },
      (error: any) => console.error('Error fetching data', error)
    );
  }

  sortPokemonList() {
    this.pokemonList.sort((a, b) => a.name.localeCompare(b.name));
  }
}
