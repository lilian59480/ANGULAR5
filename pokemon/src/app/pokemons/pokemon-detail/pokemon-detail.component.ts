import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from "../models/pokemon.model";
import { PokemonService } from "../services/pokemon.service";

@Component({
  selector: "app-pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.scss"]
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon;
  @Input() id: number;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.getpokemon();
  }

  getpokemon() {
    this.pokemonService.getPokemonById(this.id).subscribe((result: Pokemon) => {
      this.pokemon = result;
    });
  }
}
