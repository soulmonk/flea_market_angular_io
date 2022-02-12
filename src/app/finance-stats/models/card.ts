import {IBank} from '@app/finance-stats/models/bank';

export interface ICard {
  bank: IBank;
  currencyCode: string;
  description: string;
  id: number;
  name: string;
  validFrom: Date;
  validTo: Date;
}
