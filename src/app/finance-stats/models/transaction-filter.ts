export interface ITransactionFilter {
  dateFrom: Date;
  dateTo: Date;
  limit: number; /* 20 */
  offset: number;
}
