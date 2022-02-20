import {ITransactionType} from '@app/finance-stats/models/transaction-type';

export interface IStats {
  amount: number;
  currencyCode: string;
  type: ITransactionType;
}
