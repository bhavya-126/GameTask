import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GameService } from '../services/game.service';
import { AthleticsGameService } from '../services/athletics-game.service';
import { PlayerService } from '../services/player.service';
import { Player } from '../interface/player';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css'],
})
export class GameFormComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  // team: FormGroup = this.formBuilder.group({
  //   name: ['', [Validators.required]],
  //   age: ['', [Validators.required]],
  //   price: ['', [Validators.required]],
  // });

  gameForm = this.formBuilder.group({
    // for athlete games
    name: ['', [Validators.required]],
    subgame: ['', []],
    type: ['', [Validators.required]],
    playerCount: [0, [Validators.required]],
    teamA: this.formBuilder.array([
      this.formBuilder.group({
        name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        price: ['', [Validators.required]],
      }),
    ]),
    teamB: this.formBuilder.array([
      this.formBuilder.group({
        name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        price: ['', [Validators.required]],
      }),
    ]),
    player: [''],
  });

  gameService: GameService = inject(GameService);
  gameList = this.gameService.game;
  athleticsService: AthleticsGameService = inject(AthleticsGameService);
  athleticsGameList = this.athleticsService.game;
  playerService: PlayerService = inject(PlayerService);
  playerList: Player[] = this.playerService.playerList;
  PlayerNotSelected = this.playerList;
  ngOnInit() {
    console.log(this.gameForm);
  }
  setGameData() {
    let selectedGame = this.gameList.find(
      (game) => game.name === this.gameForm.controls.name.value
    );
    this.gameForm.controls.type.setValue(selectedGame?.type);
    this.gameForm.patchValue({ playerCount: selectedGame?.playerCount });
    // if (selectedGame && selectedGame.name !== 'Athletics') {
    //   console.log(`${selectedGame.name} selected`);
    //   if (selectedGame.type === 'team') {
    //     console.log('add 2 form for team game');
    //   } else {
    //     console.log('add one form for players');
    //   }
    // }
  }
  setAthleticsGame() {
    console.log(`add form for athletics game ${this.gameForm.value.subgame}`);
  }
  setPlayer(name: string, age: string, price: string) {
    return this.formBuilder.group({
      name: [name, [Validators.required]],
      age: [age, [Validators.required]],
      price: [price, [Validators.required]],
    });
  }
  addPlayer(team: string) {
    let player = this.playerList.find(
      (player) => player.name === this.gameForm.controls.player.value
    );
    let teamPlayer: FormGroup = this.setPlayer(
      player.name,
      player.age,
      player.price
    );
    player.selected = true;
    if (
      (this.gameForm.controls[team].controls[0] as FormGroup).controls['name']
        .value === '' &&
      this.gameForm.controls[team].controls.length
    ) {
      (this.gameForm.controls[team].controls[0] as FormGroup).controls[
        'name'
      ].setValue(player.name);
      (this.gameForm.controls[team].controls[0] as FormGroup).controls[
        'age'
      ].setValue(player.age);
      (this.gameForm.controls[team].controls[0] as FormGroup).controls[
        'price'
      ].setValue(player.price);
    } else this.gameForm.controls[team].push(teamPlayer);

    this.gameForm.controls.player.setValue('');

    this.PlayerNotSelected = this.playerList.filter((player) => {
      if (player.selected === true) return false;
      return true;
    });
  }
  removePlayer(index: number, team: string) {
    if (this.gameForm.controls[team].controls.length === 1) {
      (this.gameForm.controls[team].controls[0] as FormGroup).controls[
        'name'
      ].setValue('');
      (this.gameForm.controls[team].controls[0] as FormGroup).controls[
        'age'
      ].setValue('');
      (this.gameForm.controls[team].controls[0] as FormGroup).controls[
        'price'
      ].setValue('');
      

      return;
    }
    let item = this.gameForm.controls[team].controls.splice(
      index,
      1
    ) as FormGroup  ;
    this.playerList.find(
      (player) => player.name === item[0].controls['name'].value
    ).selected = false;
    this.PlayerNotSelected = this.playerList.filter((player) => {
      if (player.selected === true) return false;
      return true;
    });
  }
  submitGame() {
    if (!this.gameForm.valid) {
      console.log('error in code', this.gameForm);
    } else {
      console.log('response submitted', this.gameForm.value);
    }
  }
}
