import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";

import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";
import { PokemonDetailComponent } from "./pokemon-detail/pokemon-detail.component";

import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { PokedexComponent } from "./pokedex/pokedex.component";
import { TeamComponent } from "./team/team.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent,
    TeamComponent,
    LoginComponent,
    LogoutComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatListModule,
    MatChipsModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatToolbarModule,
    RouterModule
  ]
})
export class PokemonsModule {}
