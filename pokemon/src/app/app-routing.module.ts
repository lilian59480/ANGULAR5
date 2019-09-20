import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokemonDetailComponent } from "./pokemons/pokemon-detail/pokemon-detail.component";
import { PokedexComponent } from "./pokemons/pokedex/pokedex.component";
import { LoginComponent } from "./pokemons/login/login.component";
import { TeamComponent } from "./pokemons/team/team.component";
import { AuthGuard } from "./pokemons/auth.guard";
import { LogoutComponent } from './pokemons/logout/logout.component';

const routes: Routes = [
  { path: "", component: PokedexComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "team", component: TeamComponent, canActivate: [AuthGuard] },
  { path: "details/:id", component: PokemonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
