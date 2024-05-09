import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GameService } from '../services/game.service';
import { AthleticsGameService } from '../services/athletics-game.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css'],
})
export class GameFormComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  team: FormGroup = //this.formBuilder.array([
    this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  //]);
  gameForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    subgame: ['', [Validators.required]],
    type: ['', [Validators.required]],
    playerCount: [0, [Validators.required]],
    team: this.formBuilder.array([this.team])
  });
  

  gameService: GameService = inject(GameService);
  gameList = this.gameService.game;
  athleticsService: AthleticsGameService = inject(AthleticsGameService);
  athleticsGameList = this.athleticsService.game;
  ngOnInit() {
    console.log();
  }
  setGameData() {
    let selectedGame = this.gameList.find(
      (game) => game.name === this.gameForm.controls.name?.value
    );
    this.gameForm.controls.type.setValue(selectedGame?.type);
    this.gameForm.patchValue({ playerCount: selectedGame?.playerCount });
    if (selectedGame && selectedGame.name !== 'Athletics') {
      console.log(`${selectedGame.name} selected`);
      if (selectedGame.type === 'team') {
        console.log('add 2 form for team game');
      } else {
        console.log('add one form for players');
      }
    }
  }
  setAthleticsGame() {
    console.log(`add form for athletics game ${this.gameForm.value.subgame}`);
  }
  addPlayer(){
    this.gameForm.controls.team.push(this.team);
  }
}
