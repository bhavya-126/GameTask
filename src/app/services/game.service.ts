import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }
  game = [
    {name:'cricket', type:'team', playerCount:11},
    {name:'badminton', type:'team', playerCount:2},
    {name:'Athletics', type:'solo', playerCount:2}
  ]
}
