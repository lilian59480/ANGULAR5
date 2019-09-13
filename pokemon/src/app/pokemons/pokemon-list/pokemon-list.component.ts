import { Component, OnInit, Input } from "@angular/core";
import { PokemonService } from "../services/pokemon.service";
import { PaginatedPokemon, Pokemon } from "../models/pokemon.model";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"]
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];

  offset: number = 0;
  limit: number = 10;

  constructor(private pokemonService: PokemonService) {}

  handleSubscriptions = (result: PaginatedPokemon) => {
    this.pokemons.push(...result.data);
    this.offset += result.data.length;
    console.log(this.pokemons);
    console.log(this.offset);
  };

  ngOnInit() {
    this.pokemonService
      .getPokemons(this.offset, this.limit)
      .subscribe(this.handleSubscriptions);
  }

  onScroll() {
    this.pokemonService
      .getPokemons(this.offset, this.limit)
      .subscribe(this.handleSubscriptions);
  }
}
