import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getAllBank} from '../../reducers/bank.reducer';
import {IBank} from '../../models/bank';

@Component({
  templateUrl: './card-edit-dialog.component.html',
})
export class CardEditDialogComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    bank: new FormControl('', [Validators.required]),
    currencyCode: new FormControl('', [Validators.required]),
    validFrom: new FormControl('', [Validators.required]),
    validTo: new FormControl('', [Validators.required]),
  });
  banks$: Observable<IBank[]>;

  isNew: boolean;
  currencyCodes = ['UAH', 'USD', 'EUR', 'DKK'];

  constructor(
    public dialogRef: MatDialogRef<CardEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store) {
    this.isNew = !data.id;

    this.form.patchValue(data);
    this.banks$ = this.store.pipe(select(getAllBank));
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
