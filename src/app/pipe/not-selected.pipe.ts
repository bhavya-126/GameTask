import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../interface/player';

@Pipe({
  name: 'notSelected'
})
export class NotSelectedPipe implements PipeTransform {

  transform(playerList:Player[], selectedPlayer, ...args: unknown[]): unknown {
    return playerList
  }

}
