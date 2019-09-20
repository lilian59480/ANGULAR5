import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { PokemonListComponent } from "./pokemons/pokemon-list/pokemon-list.component";
import { PokemonDetailComponent } from "./pokemons/pokemon-detail/pokemon-detail.component";
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';

const routes: Routes = [
  // { path: "", component: PokemonListComponent },
  { path: "", component: PokedexComponent },
  { path: "details/:id", component: PokemonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
