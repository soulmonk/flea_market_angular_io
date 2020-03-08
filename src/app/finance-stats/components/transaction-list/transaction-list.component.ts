import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { ITransaction } from '../../models/transaction'
import { trackByFn } from '@app/utils'

@Component({
  selector: 'ndfsm-transaction-list',
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent {
  trackByFn = trackByFn

  @Input() transactions: ITransaction[]

  @Input() canEdit = false

  constructor (public store: Store<any>) {}

}
