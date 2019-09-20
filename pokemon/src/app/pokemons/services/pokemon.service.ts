import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { PaginatedPokemon, Pokemon } from "../models/pokemon.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class PokemonService {
  baseUrl: string = environment.apiUrl;

  // baseUrl: string =
  // "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";

  constructor(private http: HttpClient) {}

  getPokemons(
    offset: number = 0,
    limit: number = 10
  ): Observable<PaginatedPokemon> {
    const url = this.baseUrl + "/pokemons";

    const params = new HttpParams()
      .set("offset", offset.toString(10))
      .set("limit", limit.toString(10));

    return this.http
      .get<PaginatedPokemon>(url, { params })
      .pipe(
        tap(() => {
          this._log("Fetched Pokemons");
        })
      )
      .pipe(
        catchError(this.handleError<PaginatedPokemon>("getPokemons", null))
      );
  }

  searchPokemons(
    search: string,
    offset: number = 0,
    limit: number = 10
  ): Observable<PaginatedPokemon> {
    if (search.length == 0) {
      this._warn("Search is empty, call will likely fail");
    }

    const url = this.baseUrl + "/pokemons";

    const params = new HttpParams()
      .set("search", search)
      .set("offset", offset.toString(10))
      .set("limit", limit.toString(10));

    return this.http
      .get<PaginatedPokemon>(url, { params })
      .pipe(
        tap(() => {
          this._log("Searched Pokemons");
        })
      )
      .pipe(
        catchError(this.handleError<PaginatedPokemon>("searchPokemons", null))
      );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const url = this.baseUrl + "/pokemons/" + id;

    return this.http
      .get<Pokemon>(url)
      .pipe(
        tap(() => {
          this._log(`Fetched Pokemon ${id}`);
        })
      )
      .pipe(catchError(this.handleError<Pokemon>("getPokemonById", null)));
  }

  private _log(message: string) {
    console.log(`PokemonService : ${message}`);
  }

  private _warn(message: string) {
    console.warn(`PokemonService : ${message}`);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this._log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
