import { Component, inject } from '@angular/core';
import { GameDataService } from '../services/game-data.service';

@Component({
  selector: 'app-show-games',
  templateUrl: './show-games.component.html',
  styleUrls: ['./show-games.component.css']
})
export class ShowGamesComponent {
  gameService:GameDataService = inject(GameDataService);
  games = this.gameService.getGames();
}
