import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { PaginatedPokemon } from "../models/paginated-pokemon.model";
import { Pokemon } from "../models/pokemon.model";
import { LoginResponse } from "../models/login-response.model";
import { environment } from "../../../environments/environment";
import { RefreshResponse } from "../models/refresh-response.model";

@Injectable({
  providedIn: "root"
})
export class PokemonService {
  baseUrl: string = environment.apiUrl;

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

  login(email: string, password: string): Observable<LoginResponse> {
    const url = this.baseUrl + "/auth/login";

    return this.http
      .post<LoginResponse>(url, { email, password })
      .pipe(
        tap(() => {
          this._log(`Login with ${email}`);
        })
      )
      .pipe(catchError(this.handleError<LoginResponse>("login", null)));
  }

  refresh(token: string): Observable<RefreshResponse> {
    const url = this.baseUrl + "/auth/refresh";

    return this.http
      .post<RefreshResponse>(url, { token })
      .pipe(
        tap(() => {
          this._log(`Refresh token ${token}`);
        })
      )
      .pipe(catchError(this.handleError<RefreshResponse>("refresh", null)));
  }

  getTeam(auth_token: string): Observable<number[]> {
    const url = this.baseUrl + "/trainers/me/team";

    return this.http
      .get<number[]>(url, {
        headers: {
          Authorization: `Bearer ${auth_token}`
        }
      })
      .pipe(
        tap(() => {
          this._log(`Fetched my Team`);
        })
      )
      .pipe(catchError(this.handleError<number[]>("getTeam", [])));
  }

  setTeam(idList: number[], auth_token: string): Observable<null> {
    const url = this.baseUrl + "/trainers/me/team";

    return this.http
      .put<null>(url, idList, {
        headers: {
          Authorization: `Bearer ${auth_token}`
        }
      })
      .pipe(
        tap(() => {
          this._log(`Sent my Team`);
        })
      )
      .pipe(catchError(this.handleError<null>("setTeam", null)));
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
