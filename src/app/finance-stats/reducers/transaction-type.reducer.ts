import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ITransactionType} from '../models/transaction-type';
import {
  TransactionTypeActions,
  TransactionTypeActionsType,
} from '../actions/transaction-type.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends EntityState<ITransactionType> {

}

export const adapter: EntityAdapter<ITransactionType> = createEntityAdapter<ITransactionType>({
  selectId: (transactionType: ITransactionType) => transactionType.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state = initialState, action: TransactionTypeActions) {
  switch (action.type) {
    case TransactionTypeActionsType.LoadSuccess:
      return {
        ...adapter.addMany(action.payload, state),
      };
    case TransactionTypeActionsType.CreateSuccess:
      return {
        ...adapter.addOne(action.payload, state),
      };
    case TransactionTypeActionsType.UpdateSuccess:
      return {
        ...adapter.updateOne(action.payload, state),
      };
    case TransactionTypeActionsType.RemoveSuccess:
      return {
        ...adapter.removeOne(action.payload, state),
      };
    default:
      return state;
  }
}

export interface TransactionTypeState {
  transactionTypes: State;
}

export const getTransactionTypeState = createFeatureSelector<TransactionTypeState>(
  'finance-stats');

export const getTransactionTypeEntitiesState = createSelector(getTransactionTypeState,
  state => state.transactionTypes);

export const {
  selectIds: getTransactionTypeIds,
  selectEntities: getTransactionTypeEntities,
  selectAll: getAllTransactionType,
} = adapter.getSelectors(getTransactionTypeEntitiesState);

