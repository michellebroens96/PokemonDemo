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
  selectedType: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getAllPokemon().subscribe(
      (data: any) => {
        // Get all Pokémon names and their URLs
        const pokemonPromises = data.results.map((item: any) =>
          this.pokemonService.getPokemonByName(item.name).toPromise()
        );

        Promise.all(pokemonPromises).then((pokemonDetails: any) => {
          this.pokemonList = pokemonDetails.map((pokemon: any) => ({
            name: pokemon.name,
            types: pokemon.types.map((type: any) => type.type.name),
          }));
          console.log(this.pokemonList);
          // Initialize filtered list with all Pokémon
          this.filteredPokemonList = [...this.pokemonList];
        });
      },
      (error: any) => console.error('Error fetching data', error)
    );
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
