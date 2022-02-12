import {ICard} from '@app/finance-stats/models/card';
import {ITransactionInfo} from '@app/finance-stats/models/transaction-info';
import {ITransactionType} from '@app/finance-stats/models/transaction-type';

export interface ITransaction {
  amount: number;
  card: ICard;
  currencyCode: string;
  date: Date;
  description: string;
  id: number;
  info: ITransactionInfo;
  note: string;
  type: ITransactionType;
}
