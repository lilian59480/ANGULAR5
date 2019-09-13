import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HEROES } from '../mock-heroes';
import { of, Observable } from 'rxjs';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messagesService: MessagesService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES)
    this.messagesService.add("HeroService: fetched heroes")
    return heroes
  }
}
