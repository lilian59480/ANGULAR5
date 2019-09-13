import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from "../models/pokemon.model";
import { PokemonService } from "../services/pokemon.service";

@Component({
  selector: "app-pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.scss"]
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon: Pokemon;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.getpokemon();
  }

  getpokemon() {
    this.pokemonService.getPokemonById(this.id).subscribe((result: Pokemon) => {
      this.pokemon = result;
    });
  }
}
