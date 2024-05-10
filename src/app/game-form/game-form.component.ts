import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormArray,
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
export class GameFormComponent implements AfterViewChecked, OnInit {
  formBuilder: FormBuilder = inject(FormBuilder); // form builder instance
  // team: FormGroup = this.formBuilder.group({
  //   name: ['', [Validators.required]],
  //   age: ['', [Validators.required]],
  //   price: ['', [Validators.required]],
  // });

  gameForm = this.formBuilder.group({
    // data model for main form
    name: ['', [Validators.required]], //name of game
    subgame: [''], // to select data of athlete game
    type: ['', [Validators.required]], // type of game solo or team
    playerCount: [0, [Validators.required]], // total number of players
    teamA: this.formBuilder.array([
      // array for players for solo games or for teamA
      this.formBuilder.group({
        name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        price: ['', [Validators.required]],
      }),
    ]),
    teamB: this.formBuilder.array([
      // array for teamB
      this.formBuilder.group({
        name: [''],
        age: [''],
        price: [''],
      }),
    ]),
    player: [''],
  });
  changedetectionRef: ChangeDetectorRef = inject(ChangeDetectorRef); // referance for change detection
  gameService: GameService = inject(GameService); // serviceinstance for game sevices
  gameList = this.gameService.game; // lis of games
  athleticsService: AthleticsGameService = inject(AthleticsGameService); // instance for subgames of athletics
  athleticsGameList = this.athleticsService.game; // athletics game List
  playerService: PlayerService = inject(PlayerService); // instance of players service
  playerList: Player[] = this.playerService.playerList; // list of players
  playerNotSelected = this.playerList; // variable to store those player which are not selected for team yet
  selectedGame;
  ngOnInit() {
    // console.log(this.gameForm);
  }
  ngAfterViewChecked() {
    this.playerNotSelected = this.playerList.filter((player) => {
      //change the dropdown values
      if (player.selected === true) return false;
      return true;
    });

    this.changedetectionRef.detectChanges();
  }
  clearForm() {
    // this.gameForm.reset();
    for (let player of this.playerList) {
      player.selected = false;
    }
    for (
      let index = 0;
      index < this.gameForm.controls.teamA.controls.length;
      index++
    ) {
      this.gameForm.controls.teamA.removeAt(index);
      // this.removePlayer(index, 'teamA');
    }
    for (
      let index = 0;
      index < this.gameForm.controls.teamB.controls.length;
      index++
    ) {
      // this.removePlayer(index, 'teamB');
      this.gameForm.controls.teamB.removeAt(index);
    }
  }
  setGameData() {
    //function to add or remove validations based on game selected
    this.changedetectionRef.detectChanges();
    if (!this.gameForm.controls.name.value) return;
    // selected game from dropdown
    this.selectedGame = this.gameList.find(
      (game) => game.name === this.gameForm.controls.name.value
    );
    // updating form data based on game
    this.gameForm.patchValue({ type: this.selectedGame?.type });
    this.gameForm.patchValue({ playerCount: this.selectedGame?.playerCount });
    // solo game
    if (this.gameForm.controls.type.value.toLowerCase() === 'solo') {
      // setting validators based on game type
      // console.log('athlectics');
      this.gameForm.controls.teamA.clearValidators();
      this.gameForm.controls.teamA.updateValueAndValidity();
      this.gameForm.controls.teamB.clearValidators();
      this.gameForm.controls.teamB.updateValueAndValidity();
      this.gameForm.controls.subgame.addValidators(Validators.required);
      this.gameForm.controls.teamA.addValidators(
        Validators.minLength(this.selectedGame.playerCount)
      ); // solo games should have minimum 2 playes
      // this.gameForm.controls.teamA.updateValueAndValidity();
      // this.changedetectionRef.detectChanges();
      // console.log(this.gameForm);
    }
    // team game
    else if (this.gameForm.controls.type.value.toLowerCase() === 'team') {
      // setting validators based on game type
      this.gameForm.controls.subgame.removeValidators(Validators.required);
      // this.gameForm.controls.subgame.updateValueAndValidity();
      // team games have fixed number of player
      // this.gameForm.controls.teamA.addValidators(
      //   Validators.minLength(this.selectedGame.playerCount)
      // );
      // this.gameForm.controls.teamA.addValidators(
      //   Validators.maxLength(this.selectedGame.playerCount)
      this.gameForm.updateValueAndValidity();
      // );
      this.gameForm.controls.teamA.setValidators([
        Validators.minLength(this.selectedGame.playerCount),
        Validators.maxLength(this.selectedGame.playerCount),
      ]);
      this.gameForm.controls.teamB.setValidators([
        Validators.minLength(this.selectedGame.playerCount),
        Validators.maxLength(this.selectedGame.playerCount),
      ]);
      // this.gameForm.controls.teamB.addValidators(
      //   Validators.minLength(this.selectedGame.playerCount)
      // );
      // this.gameForm.controls.teamB.addValidators(
      //   Validators.maxLength(this.selectedGame.playerCount)
      // );
      this.changedetectionRef.detectChanges();
    }
  }
  setPlayer(name: string, age: string, price: string) {
    //  to generate new form group when someone adds player
    return this.formBuilder.group({
      name: [name, [Validators.required]],
      age: [age, [Validators.required]],
      price: [price, [Validators.required]],
    });
  }
  addPlayer(team: string) {
    let player = this.playerList.find(
      // finding selected player from list
      (player) => player.name === this.gameForm.controls.player.value
    );
    let teamPlayer: FormGroup = this.setPlayer(
      player.name,
      player.age,
      player.price
    ); // creating form group to add in formArray
    player.selected = true; // changing player status
    if (
      !(this.gameForm.controls[team]?.controls[0] as FormGroup).controls['name']
        .value &&
      this.gameForm.controls[team].controls.length
    ) {
      // assigning values when no player is selected
      (this.gameForm.controls[team].controls[0] as FormGroup).controls[
        'name'
      ].setValue(player.name);
      (this.gameForm.controls[team].controls[0] as FormGroup).controls[
        'age'
      ].setValue(player.age);
      (this.gameForm.controls[team].controls[0] as FormGroup).controls[
        'price'
      ].setValue(player.price);
    } else this.gameForm.controls[team].push(teamPlayer); // adding player formGroup to form formArray

    this.gameForm.controls.player.setValue('');
    console.log(this.gameForm.controls);
  }
  removePlayer(index: number, team: string) {
    // deselecting player
    let item = this.gameForm.controls[team].controls[index] as FormGroup; // storing instance of fromgroup which is removed

    this.playerList.find(
      (player) => player.name === item.controls['name'].value
    ).selected = false; // updating the player selection status

    if (this.gameForm.controls[team].controls.length === 1) {
      // if removing last player
      this.gameForm.controls[team].reset();
      return;
    }
    (this.gameForm.controls[team] as FormArray).removeAt(index);
  }

  submitGame() {
    // this.gameForm.reset();
    this.clearForm();
    //   if (this.gameForm.controls.type.value.toLowerCase() === 'solo') {
    //     if (!this.gameForm.controls.teamA.valid) {
    //       console.log('error in code', this.gameForm);
    //     } else if (this.gameForm.controls.teamA.controls.length < 2) {
    //       console.log(' solo games should have minimum 2 players');
    //     } else {
    //       console.log('response submitted', this.gameForm.value);
    //     }
    //   } else {
    //     if (!this.gameForm.valid) {
    //       console.log('error in code', this.gameForm);
    //     } else {
    //       console.log('response submitted', this.gameForm.value);
    //     }
    //   }
  }
}
