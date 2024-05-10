import { Injectable } from '@angular/core';
import { Player } from '../interface/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor() {}
  playerList: Player[] = [
    { name: 'player1', age: '25', price: '4135', selected: false },
    { name: 'player2', age: '20', price: '4315', selected: false },
    { name: 'player3', age: '24', price: '8462', selected: false },
    { name: 'player4', age: '25', price: '1472', selected: false },
    { name: 'player5', age: '26', price: '9578', selected: false },
    { name: 'player6', age: '30', price: '3645', selected: false },
    { name: 'player7', age: '25', price: '4135', selected: false },
    { name: 'player8', age: '20', price: '4315', selected: false },
    { name: 'player9', age: '24', price: '8462', selected: false },
    { name: 'player10', age: '25', price: '1472', selected: false },
    { name: 'player11', age: '26', price: '9578', selected: false },
    { name: 'player12', age: '30', price: '3645', selected: false },
    { name: 'player13', age: '30', price: '3645', selected: false },
    { name: 'player14', age: '30', price: '3645', selected: false },
    { name: 'player15', age: '30', price: '3645', selected: false },
    { name: 'player16', age: '30', price: '3645', selected: false },
    { name: 'player17', age: '30', price: '3645', selected: false },
    { name: 'player18', age: '30', price: '3645', selected: false },
    { name: 'player19', age: '30', price: '3645', selected: false },
    { name: 'player20', age: '30', price: '3645', selected: false },
    { name: 'player21', age: '30', price: '3645', selected: false },
    { name: 'player22', age: '30', price: '3645', selected: false },
  ];
  addPlayer(name: string, age: string, price: string) {
    this.playerList.push({ name, age, price, selected: false });
  }
}
