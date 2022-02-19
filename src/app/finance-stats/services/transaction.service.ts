import {Apollo, gql} from 'apollo-angular';
import {Injectable} from '@angular/core';


import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ITransaction} from '../models/transaction';
import {IStats} from '@app/finance-stats/models/stats';

const FULL_RESPONSE = `{
  id
  date
  description
  amount
  type {
    id
    name
    description
  }
  note
  currencyCode
  card {
    id
    name
    validFrom
    validTo
    currencyCode
    bank {
      id
      name
      url
    }
    description
  }
  info {
    id
    blockedAmount
    fixedAmount
    currencyExchange
  }
}
`;

@Injectable()
export class TransactionService {

  constructor(private apollo: Apollo) {
  }

  listFull(): Observable<ITransaction[]> {
    return this.apollo.query({
      query: gql`query listTransactions {
        transactions ${FULL_RESPONSE}
      }`,
    }).pipe(map(({data}) =>
      (data as any).transactions as ITransaction[],
    ));
  }

  stats(): Observable<IStats[]> {
    return this.apollo.query({
      query: gql`query total {
        total {
          type {
            id
            name
          }
          amount
        }
      }`,
    }).pipe(map(({data}) => (data as any).total as IStats[]));
  }

  create(record: ITransaction): Observable<ITransaction> {
    return this.apollo.mutate({
      mutation: gql`mutation createTransaction($transaction: TransactionCreate){
        addTransaction(transaction: $transaction) ${FULL_RESPONSE}
      }`,
      variables: {
        transaction: record,
      }
    }).pipe(map(({data}) =>
      (data as any).addTransaction as ITransaction,
    ));
  }

  save(record: ITransaction): Observable<ITransaction> {
    if (record.id === undefined) {
      return this.create(record);
    }
    return this.update(record);
  }

  update(record: ITransaction): Observable<ITransaction> {
    return this.apollo.mutate({
      mutation: gql`mutation updateTransaction($transaction: TransactionUpdate){
        updateTransaction(transaction: $transaction) ${FULL_RESPONSE}
      }`,
      variables: {
        transaction: {
          id: record.id,
          amount: record.amount,
          card: record.card,
          currencyCode: record.currencyCode,
          date: record.date,
          description: record.description,
          note: record.note,
          type: record.type,
        },
      }
    }).pipe(map(({data}) =>
      (data as any).updateTransaction as ITransaction,
    ));
  }
}
