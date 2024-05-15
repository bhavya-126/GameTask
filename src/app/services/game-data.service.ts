import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  games=[];
  addGame(game:Object){
    this.games.push(game);
  }
  getGames(){
    return this.games;
  }
}
