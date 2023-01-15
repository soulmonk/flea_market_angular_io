import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getAllBank} from '../../reducers/bank.reducer';
import {IBank} from '../../models/bank';
import {MatDatepicker} from '@angular/material/datepicker';

@Component({
  templateUrl: './card-edit-dialog.component.html',
  styles: [`
  .example-month-picker .mat-calendar-period-button {
  pointer-events: none;
}

.example-month-picker .mat-calendar-arrow {
  display: none;
}
`],
})
export class CardEditDialogComponent {

  form: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    bank: new UntypedFormControl('', [Validators.required]),
    currencyCode: new UntypedFormControl('', [Validators.required]),
    validFrom: new UntypedFormControl('', [Validators.required]),
    validTo: new UntypedFormControl('', [Validators.required]),
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

  setMonthAndYear(normalizedMonthAndYear: Date, datepicker: MatDatepicker<any>, property: string) {
    this.form.controls[property].setValue(normalizedMonthAndYear)
    // ctrlValue.month(normalizedMonthAndYear.month());
    // ctrlValue.year(normalizedMonthAndYear.year());
    // this.date.setValue(ctrlValue);
    datepicker.close();
  }
}
