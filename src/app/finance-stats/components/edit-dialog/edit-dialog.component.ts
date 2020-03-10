import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { getAllCard } from '../../reducers/card.reducer'
import { getAllTransactionType } from '../../reducers/transaction-type.reducer'
import { ICard } from '../../models/card'
import { ITransactionType } from '../../models/transaction-type'
import { Observable } from 'rxjs'

@Component({
  templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent {

  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    type: new FormControl('', [Validators.required]),

    note: new FormControl('', []),
    currencyCode: new FormControl('', []), // todo user preferencies

    card: new FormControl(0, []), // todo from list

    date: new FormControl(null, []), // todo date validatoer

    // info: new FormGroup({
    //   blockedAmount: new FormControl(0, [Validators.required]),
    //   fixedAmount: new FormControl(0, []),
    // }),

  })

  isNew: boolean

  transactionTypes$: Observable<ITransactionType[]>
  cards$: Observable<ICard[]>

  constructor (
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store) {
    this.isNew = !data.id

    this.form.patchValue(
      { ...data, keywords: data.keywords ? data.keywords.join(',') : '' })
    this.transactionTypes$ = this.store.pipe(select(getAllTransactionType))
    this.cards$ = this.store.pipe(select(getAllCard))
  }

  onNoClick (): void {
    this.dialogRef.close()
  }

  submit () {
    if (this.form.valid) {
      const formValues = this.form.value
      formValues.keywords = formValues.keywords.split(',').map(v => v.trim())
      this.dialogRef.close({ ...this.data, ...formValues })
    }
  }
}
