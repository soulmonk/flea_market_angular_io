import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IBank} from '../models/bank';
import {
  BankActions,
  BankActionsType,
} from '../actions/bank.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends EntityState<IBank> {

}

export const adapter: EntityAdapter<IBank> = createEntityAdapter<IBank>({
  selectId: (bank: IBank) => bank.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state = initialState, action: BankActions) {
  switch (action.type) {
    case BankActionsType.LoadSuccess:
      return {
        ...adapter.addMany(action.payload, state),
      };
    case BankActionsType.CreateSuccess:
      return {
        ...adapter.addOne(action.payload, state),
      };
    case BankActionsType.UpdateSuccess:
      return {
        ...adapter.updateOne(action.payload, state),
      };
    case BankActionsType.RemoveSuccess:
      return {
        ...adapter.removeOne(action.payload, state),
      };
    default:
      return state;
  }
}

export interface BankState {
  banks: State;
}

export const getBankState = createFeatureSelector<BankState>(
  'finance-stats');

export const getBankEntitiesState = createSelector(getBankState,
  state => state.banks);

export const {
  selectIds: getBankIds,
  selectEntities: getBankEntities,
  selectAll: getAllBank,
} = adapter.getSelectors(getBankEntitiesState);

