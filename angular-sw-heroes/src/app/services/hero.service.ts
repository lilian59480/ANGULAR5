import { Injectable } from "@angular/core";
import { Hero } from "../models/hero.model";
import { of, Observable } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from "./messages.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: "root"
})
export class HeroService {

  heroesUrl: string = "api/heroes"


  constructor(private messagesService: MessagesService, private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    const heroes = this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(() => {this.log("Fetched heroes")}),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const url = this.heroesUrl + "/" + id.toString(10)
    const hero = this.http
      .get<Hero>(url)
      .pipe(
        tap((result: Hero) => {this.log(`fetched hero id=${result.id}`)}),
        catchError(this.handleError<Hero>(`getHero id=${id}`, null))
      );
    return hero;
  }

  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, HTTP_OPTIONS).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero (hero: Hero): Observable<any> {
    return this.http.post(this.heroesUrl, hero, HTTP_OPTIONS).pipe(
      tap((newHero: Hero) => this.log(`added hero with id=${newHero.id}`)),
      catchError(this.handleError<any>('addHero'))
    );
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Hero>(url, HTTP_OPTIONS).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const params = new HttpParams()
      .set('name', term);
    return this.http.get<Hero[]>(`${this.heroesUrl}`, {params}).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private log(message: string) {
    this.messagesService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
