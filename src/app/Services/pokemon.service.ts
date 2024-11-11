import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private Url: string;

  constructor(private http: HttpClient) {
    this.Url = 'https://pokeapi.co/api/v2/';
  }

  getAllPokemon() {
    return this.http.get(`${this.Url}pokemon/`);
  }

  getPokemonByName(name: string) {
    return this.http.get(`${this.Url}pokemon/${name}`);
  }
}
