import { Component } from '@angular/core';
import { PokemonService } from '../Services/pokemon.service';
import { Pokemon } from '../Models/Pokemon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent {
  pokemonList: Pokemon[] = [];
  filteredPokemonList: Pokemon[] = [];
  searchQuery: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getAllPokemon().subscribe(
      (data: any) => {
        this.pokemonList = data.results.map((item: any) => ({
          name: item.name,
          url: item.url,
        }));
        this.filteredPokemonList = [...this.pokemonList];
      },
      (error: any) => console.error('Error fetching data', error)
    );
  }

  sortPokemonList() {
    this.filteredPokemonList.sort((a, b) => a.name.localeCompare(b.name));
  }

  searchPokemon() {
    const query = this.searchQuery.toLowerCase();
    this.filteredPokemonList = this.pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query)
    );
  }
}
