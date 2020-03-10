import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { ITransaction } from '../models/transaction'
import {
  TransactionActions,
  TransactionActionsType,
} from '@app/finance-stats/actions/transactions.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State extends EntityState<ITransaction> {

}

export const adapter: EntityAdapter<ITransaction> = createEntityAdapter<ITransaction>(
  {
    selectId: (transaction: ITransaction) => transaction.id,
    sortComparer: false,
  })

export const initialState: State = adapter.getInitialState({})

export function reducer (state = initialState, action: TransactionActions) {
  switch (action.type) {
    case TransactionActionsType.LoadSuccess:
      return {
        ...adapter.addMany(action.payload, state),
      }
    case TransactionActionsType.CreateSuccess:
      return {
        ...adapter.addOne(action.payload, state),
      }
    case TransactionActionsType.UpdateSuccess:
      return {
        ...adapter.updateOne(action.payload, state),
      }
    case TransactionActionsType.RemoveSuccess:
      return {
        ...adapter.removeOne(action.payload, state),
      }
    default:
      return state
  }
}

export interface TransactionState {
  transactions: State;
}

export const getTransactionState = createFeatureSelector<TransactionState>(
  'finance-stats')

export const getTransactionEntitiesState = createSelector(getTransactionState,
  state => {
    console.log('transaction.reducer.ts::::51 >>>', state)
    return state.transactions
  })

export const {
  selectIds: getTransactionIds,
  selectEntities: getTransactionEntities,
  selectAll: getAllTransaction,
} = adapter.getSelectors(getTransactionEntitiesState)

