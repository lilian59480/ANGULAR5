import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PokemonService } from "../services/pokemon.service";
import { Pokemon } from "../models/pokemon.model";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { PaginatedPokemon } from '../models/paginated-pokemon.model';

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"]
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];

  @Output() itemChanged = new EventEmitter<number>();

  private searchTerms = new Subject<string>();

  term: string = "";

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
    this.fetchPokemons();

    this.searchTerms
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .pipe(
        switchMap((term: string) => this.pokemonService.searchPokemons(term, this.offset, this.limit))
      )
      .subscribe(this.handleSubscriptions);
  }

  onScroll() {
    this.fetchPokemons();
  }

  onSelect(id: number) {
    this.itemChanged.emit(id);
  }

  private fetchPokemons() {
    if (this.term.length > 0) {
      this.pokemonService
        .searchPokemons(this.term, this.offset, this.limit)
        .subscribe(this.handleSubscriptions);
    } else {
      this.pokemonService
        .getPokemons(this.offset, this.limit)
        .subscribe(this.handleSubscriptions);
    }
  }

  search(term: string) {
    this.pokemons = [];
    this.offset = 0;
    this.term = term;
    if (term.length > 0) {
      this.searchTerms.next(term);
    } else {
      this.fetchPokemons()
    }
  }
}
