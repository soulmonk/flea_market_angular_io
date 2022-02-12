import {reducer as transactionReducer} from './transaction.reducer';
import {reducer as cardReducer} from './card.reducer';
import {reducer as transactionTypeReducer} from './transaction-type.reducer';

export const reducers = {
  transactions: transactionReducer,
  cards: cardReducer,
  transactionTypes: transactionTypeReducer,
};
