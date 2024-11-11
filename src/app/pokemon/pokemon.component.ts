import { Component } from '@angular/core';
import { PokemonService } from '../Services/pokemon.service';
import { Pokemon } from '../Models/Pokemon';
import { FormsModule } from '@angular/forms';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';

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
    this.pokemonService.getAllPokemon().subscribe((data: any) => {
      this.pokemonList = data.results;
      this.filteredPokemonList = [...this.pokemonList];
      this.pokemonList.forEach((pokemon) => {
        this.pokemonService
          .getPokemonByName(pokemon.name)
          .subscribe((data: any) => {
            pokemon.types = data.types.map((type: any) => type.type.name);
          });
      });
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
