import { Component, inject, model, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { GameUtil } from '../gameutil';
import { MatDialog } from '@angular/material/dialog';
import { PlayerWordInfoDialogComponent } from '../player-word-info-dialog/player-word-info-dialog.component';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-overview',
  imports: [MatLabel, MatCard, MatButton, MatInput, FormsModule, MatFormField],
  templateUrl: './player-overview.component.html',
  styleUrl: './player-overview.component.css'
})
export class PlayerOverviewComponent {

   numberOfPlayers = model<number>(4);
   players = model<Player[]>([]);
   readonly dialog = inject(MatDialog);

   constructor() {
      this.initializeGame();
   }

   initializeGame(): void  {
    const playerData = this.retrieveFromLocalStorage();
    this.players.set(playerData);
    const imposter = GameUtil.randomNumber(this.numberOfPlayers());
    const word = GameUtil.getRandomWord();

    // TODO: optimize this part
    // If no data is available we initialize empty
    if(this.players().length == 0) {
      const playerArray: Player[] = [];

      for(let i = 0; i < this.numberOfPlayers(); i++) {
        const isImposter = i+1 == imposter;
        playerArray.push({
          name: 'Spieler ' + (i+1),
          isImposter: isImposter,
          word: isImposter? '' : word,
        })
      }
      this.players.set(playerArray);
    }
      // otherwise we only change imposter and word
    else {
        for(let i = 0; i < this.numberOfPlayers(); i++) {
          const isImposter = i+1 == imposter;
          this.players()[i].isImposter = isImposter;
          this.players()[i].word = isImposter ? '' : word
        }
    }

 
    this.saveToLocalStorage();
   }


   showImposterInfo(player: Player): void {
    const dialogRef = this.dialog.open(PlayerWordInfoDialogComponent, {
      data: {player: player}
    });
   }

   
   saveToLocalStorage(): void {
    localStorage.setItem('imposter__playerlist', JSON.stringify(this.players()));
   }

   retrieveFromLocalStorage(): Player[] {
    const playerData = localStorage.getItem('imposter__playerlist')
    if(!playerData) {
      return [];
    }
    return JSON.parse(playerData);
   }
}


export interface Player {
  name: string;
  isImposter: boolean;
  word: string;
}