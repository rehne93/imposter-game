import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Player } from '../player-overview/player-overview.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-player-word-info-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './player-word-info-dialog.component.html',
  styleUrl: './player-word-info-dialog.component.css',
})
export class PlayerWordInfoDialogComponent {
  readonly dialogRef = inject(MatDialogRef<PlayerWordInfoDialogComponent>);
  readonly data = inject<PlayerDialogData>(MAT_DIALOG_DATA);
  readonly player = model(this.data.player);
  readonly showHintsOnlyForImposter = model(this.data.showHintsOnlyForImposter);
}

export interface PlayerDialogData {
  player: Player;
  showHintsOnlyForImposter: boolean;
}
