import { Component, inject, model, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { GameUtil, Word } from '../gameutil';
import { MatDialog } from '@angular/material/dialog';
import { PlayerWordInfoDialogComponent } from '../player-word-info-dialog/player-word-info-dialog.component';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SureDialogComponent } from '../sure-dialog/sure-dialog.component';

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
    console.log(word);

    // TODO: optimize this part
    // If no data is available we initialize empty
    if(this.players().length !== this.numberOfPlayers()) {
      const playerArray: Player[] = [];

      for(let i = 0; i < this.numberOfPlayers(); i++) {
        const isImposter = i+1 == imposter;
        playerArray.push({
          name: 'Spieler ' + (i+1),
          isImposter: isImposter,
          word: word,
          reveal: false,
          position: 0
        })
      }
      this.players.set(playerArray);
    }
      // otherwise we only change imposter and word
    else {
        for(let i = 0; i < this.numberOfPlayers(); i++) {
          const isImposter = i+1 == imposter;
          const playerExists = this.players()[i] !== undefined;
          if(!playerExists) {
            this.players().push({
              name: 'Spieler ' + (i+1),
              isImposter: false,
              word: {wort: '', hinweis: ''},
              reveal: false,
              position: 0
            });
          }
          this.players()[i].isImposter = isImposter;
          this.players()[i].word =  word;
        }
    }

    this.shufflePositions();
    this.saveToLocalStorage();
   }


   shufflePositions() : void {
      const indices = this.getRandomIndices(this.numberOfPlayers());

     for(let i = 0; i < this.numberOfPlayers(); i++) {
        this.players()[i].position = indices[i];
     }
   }

   getRandomIndices(n: number): number[] {
    const indices = Array.from({ length: n }, (_, i) => i);

    // Fisher-Yates Shuffle
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    return indices;
}

   showImposterInfo(player: Player): void {
    const dialogRef = this.dialog.open(PlayerWordInfoDialogComponent, {
      data: {player: player}
    });
   }

   reveal(player: Player): void {
    player.reveal = true;
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
  word: Word;
  reveal: boolean;
  position: number;
}