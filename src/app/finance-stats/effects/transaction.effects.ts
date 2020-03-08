import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { TransactionService } from '../services/transaction.service'

@Injectable()
export class TransactionEffects {




  constructor (private actions: Actions,
    private transactionService: TransactionService) {}
}
