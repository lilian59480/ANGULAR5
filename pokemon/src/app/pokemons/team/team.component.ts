import { Component, OnInit, ViewChild } from "@angular/core";
import { PokemonService } from "../services/pokemon.service";
import { Pokemon } from "../models/pokemon.model";
import { forkJoin } from "rxjs";
import { PCookieService } from "../p-cookie.service";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"]
})
export class TeamComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private cookieService: PCookieService
  ) {}

  teamPokemons: Pokemon[] = [];
  pokemons: Pokemon[] = [];

  private buildFromIdList = (result: number[]) => {
    const pokemonObservers = result.map(id => {
      return this.pokemonService.getPokemonById(id);
    });

    forkJoin(pokemonObservers).subscribe(elt => {
      this.teamPokemons = elt;
    });
  };

  private fetchAllPokemons() {
    this.fetchPokemons(0);
  }

  private fetchPokemons(offset: number) {
    return this.pokemonService.getPokemons(offset, 10).subscribe(result => {
      if (result.data.length == 0) {
        return;
      }

      this.pokemons.push(...result.data);
      this.fetchPokemons((offset += result.data.length));
    });
  }

  private fetchTeam() {
    const token = this.cookieService.getAccessToken();
    this.pokemonService.getTeam(token).subscribe(this.buildFromIdList);
  }

  sendTeam(selectedItems: any[]) {
    const idList: number[] = selectedItems.map(elt => {
      const value: number = elt.value;
      return value;
    });

    const token = this.cookieService.getAccessToken();

    this.pokemonService.setTeam(idList, token).subscribe(() => {
      this.fetchTeam();
    });
  }

  ngOnInit() {
    this.fetchTeam();
    this.fetchAllPokemons();
  }
}
