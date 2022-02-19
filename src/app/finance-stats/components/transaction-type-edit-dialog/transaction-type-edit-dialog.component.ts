import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {getAllCard} from '../../reducers/card.reducer';
import {getAllTransactionType} from '../../reducers/transaction-type.reducer';
import {ICard} from '../../models/card';
import {ITransactionType} from '../../models/transaction-type';
import {Observable} from 'rxjs';

@Component({
  templateUrl: './transaction-type-edit-dialog.component.html',
})
export class TransactionTypeEditDialogComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
  });

  isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<TransactionTypeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isNew = !data.id;

    this.form.patchValue(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      const formValues = this.form.value;
      // todo close after success
      this.dialogRef.close({...this.data, ...formValues});
    }
  }
}