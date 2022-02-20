import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {getAllCard} from '../../reducers/card.reducer';
import {getAllTransactionType} from '../../reducers/transaction-type.reducer';
import {ICard} from '../../models/card';
import {ITransactionType} from '../../models/transaction-type';
import {Observable} from 'rxjs';
import {Load as LoadBank} from '@app/finance-stats/actions/bank.actions';

@Component({
  templateUrl: './transaction-edit-dialog.component.html',
})
export class TransactionEditDialogComponent {

  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    type: new FormControl('', [Validators.required]),

    note: new FormControl('', []),
    currencyCode: new FormControl('', []), // todo user preferences

    card: new FormControl(null, []), // todo from list

    date: new FormControl(null, []), // todo date validator

    // info: new FormGroup({
    //   blockedAmount: new FormControl(0, [Validators.required]),
    //   fixedAmount: new FormControl(0, []),
    // }),

  });

  isNew: boolean;

  transactionTypes$: Observable<ITransactionType[]>;
  cards$: Observable<ICard[]>;

  currencyCodes = ['UAH', 'USD', 'EUR', 'DKK'];

  constructor(
    public dialogRef: MatDialogRef<TransactionEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store) {
    this.isNew = !data.id;

    this.transactionTypes$ = this.store.pipe(select(getAllTransactionType));
    this.cards$ = this.store.pipe(select(getAllCard));

    this.form.patchValue({
      ...data,
      type: data.type?.id,
      card: data.card?.id,
    });
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
