import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import { ICard } from '../models/card'
import {
  CardActions,
  CardActionsType,
} from '../actions/card.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State extends EntityState<ICard> {

}

export const adapter: EntityAdapter<ICard> = createEntityAdapter<ICard>({
  selectId: (card: ICard) => card.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state = initialState, action: CardActions) {
  switch (action.type) {
    case CardActionsType.LoadSuccess:
      return {
        ...adapter.addMany(action.payload, state),
      };
    case CardActionsType.CreateSuccess:
      return {
        ...adapter.addOne(action.payload, state),
      };
    case CardActionsType.UpdateSuccess:
      return {
        ...adapter.updateOne(action.payload, state),
      };
    case CardActionsType.RemoveSuccess:
      return {
        ...adapter.removeOne(action.payload, state),
      };
    default:
      return state;
  }
}

export interface CardState {
  cards: State;
}

export const getCardState = createFeatureSelector<CardState>(
  'finance-stats')

export const getCardEntitiesState = createSelector(getCardState,
  state => state.cards)

export const {
  selectIds: getCardIds,
  selectEntities: getCardEntities,
  selectAll: getAllCard,
} = adapter.getSelectors(getCardEntitiesState)

