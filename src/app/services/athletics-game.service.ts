import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AthleticsGameService {

  constructor() { }
  game = [
    {name: 'Race(1000)'},
    {name: 'Hammer Throw'},
    {name: 'High Jump'},
    {name: 'Shot Put'},
  ]
}
