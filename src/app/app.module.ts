import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameFormComponent } from './game-form/game-form.component';
import { NotSelectedPipe } from './pipe/not-selected.pipe';
import { ShowGamesComponent } from './show-games/show-games.component';

@NgModule({
  declarations: [
    AppComponent,
    GameFormComponent,
    NotSelectedPipe,
    ShowGamesComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
