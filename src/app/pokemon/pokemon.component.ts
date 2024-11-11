import { Component } from '@angular/core';
import { PokemonService } from '../Services/pokemon.service';
import { Pokemon } from '../Models/Pokemon';
import { FormsModule } from '@angular/forms';
import { forkJoin, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent {
  pokemonList: Pokemon[] = [];
  filteredPokemonList: Pokemon[] = [];
  searchQuery: string = '';
  selectedType: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService
      .getAllPokemon()
      .pipe(
        switchMap((data: any) => {
          this.pokemonList = data.results;
          this.filteredPokemonList = [...this.pokemonList];

          const pokemonDetailsObservables = this.pokemonList.map((pokemon) =>
            this.pokemonService.getPokemonByName(pokemon.name).pipe(
              map((pokemonData: any) => ({
                ...pokemon,
                types: pokemonData.types.map((type: any) => type.type.name),
              }))
            )
          );

          return forkJoin(pokemonDetailsObservables);
        })
      )
      .subscribe((detailedPokemonList) => {
        this.pokemonList = detailedPokemonList;
      });
  }

  // Filter Pokémon based on selected type
  filterByType() {
    if (this.selectedType) {
      this.filteredPokemonList = this.pokemonList.filter((pokemon) => {
        return pokemon.types.includes(this.selectedType);
      });
    } else {
      this.filteredPokemonList = [...this.pokemonList];
    }
  }

  // Sort Pokémon list alphabetically
  sortPokemonList() {
    this.filteredPokemonList.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Search Pokémon by name
  searchPokemon() {
    const query = this.searchQuery.toLowerCase();
    this.filteredPokemonList = this.pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query)
    );
  }
}
