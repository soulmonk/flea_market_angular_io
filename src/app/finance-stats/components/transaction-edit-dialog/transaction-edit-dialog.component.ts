import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {getAllCard} from '../../reducers/card.reducer';
import {getAllTransactionType} from '../../reducers/transaction-type.reducer';
import {ICard} from '../../models/card';
import {ITransactionType} from '../../models/transaction-type';
import {Observable} from 'rxjs';
import {environment as env} from '@env';
import {ITransaction} from '@app/finance-stats/models/transaction';

@Component({
  templateUrl: './transaction-edit-dialog.component.html',
  styles: [`
    .row {
      display: flex;
      flex-direction: row;
    }

    .col {
      flex: 1;
      margin-right: 20px;
    }

    .col:last-child {
      margin-right: 0;
    }
  `],
})
export class TransactionEditDialogComponent {

  form: UntypedFormGroup = new UntypedFormGroup({
    description: new UntypedFormControl('', [Validators.required]),
    amount: new UntypedFormControl(0, [Validators.required]),
    type: new UntypedFormControl('', [Validators.required]),

    note: new UntypedFormControl('', []),
    currencyCode: new UntypedFormControl('', []), // todo user preferences

    card: new UntypedFormControl(null, []),

    date: new UntypedFormControl(null, []), // todo date validator

    // info: new FormGroup({
    //   blockedAmount: new FormControl(0, [Validators.required]),
    //   fixedAmount: new FormControl(0, []),
    // }),

  });

  isNew: boolean;

  transactionTypes$: Observable<ITransactionType[]>;
  cards$: Observable<ICard[]>;

  currencyCodes = env.currencyCodes;

  constructor(
    public dialogRef: MatDialogRef<TransactionEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITransaction,
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

  onNoClick(): boolean {
    this.dialogRef.close();
    return false;
  }

  submit() {
    if (this.form.valid) {
      const formValues = this.form.value;
      // todo close after success
      this.dialogRef.close({...this.data, ...formValues});
    }
  }
}
