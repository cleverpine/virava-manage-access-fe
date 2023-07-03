import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogData } from '../../models/dialog-model';

@Component({
  selector: 'ccl-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  title: string;
  content: string;
  contentWarning: string;
  closeTitle: string;
  okTitle: string;
  hasCloseButton: boolean;
  hasOkButton: boolean;
  isOkButtonRed: boolean;

  constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) data: DialogData) {
    this.title = data.title || '';
    this.content = data.content || '';
    this.contentWarning = data.contentWarning || '';
    this.closeTitle = data.closeTitle || 'common.close';
    this.okTitle = data.okTitle || '';
    this.hasCloseButton = !!data.hasCloseButton;
    this.hasOkButton = !!data.hasOkButton;
    this.isOkButtonRed = !!data.isOkButtonRed;
  }

  close() {
    this.dialogRef.close();
  }
}
