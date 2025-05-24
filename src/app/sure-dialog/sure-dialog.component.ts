import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-sure-dialog',
  imports: [MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    FormsModule],
  templateUrl: './sure-dialog.component.html',
  styleUrl: './sure-dialog.component.css'
})
export class SureDialogComponent {

  readonly dialogRef = inject(MatDialogRef<SureDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);


  close(result: boolean) {
    this.dialogRef.close(result);
  }

}
