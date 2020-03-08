import * as fromTransaction from './transaction.reducer'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface FinanceStatsState {
  transactions: fromTransaction.State;
}

export const getTransactionState = createFeatureSelector<FinanceStatsState>(
  'transactions')

export const getTransactionEntitiesState = createSelector(getTransactionState,
  state => state.transactions)

export const {
  selectIds: getTransactionIds,
  selectEntities: getTransactionEntities,
  selectAll: getAllTransaction,
} = fromTransaction.adapter.getSelectors(getTransactionEntitiesState)

export const reducers = {
  transactions: fromTransaction.reducer,
}
