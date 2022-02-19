import {Apollo, gql} from 'apollo-angular';
import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ITransactionType} from '../models/transaction-type';

const FULL_RESPONSE = `{
  id
  name
  description
}`;

@Injectable()
export class TransactionTypeService {

  constructor(private apollo: Apollo) {}

  list(): Observable<ITransactionType[]> {
    return this.apollo.query({
      query: gql`{
        transactionTypes ${FULL_RESPONSE}
      }`,
    }).pipe(map(({data}) => {
      return (data as any).transactionTypes as ITransactionType[];
    }));
  }
  create(record: ITransactionType): Observable<ITransactionType> {
    return this.apollo.mutate({
      mutation: gql`mutation createTransactionType($transactionType: TransactionTypeCreate){
        addTransactionType(type: $transactionType) ${FULL_RESPONSE}
      }`,
      variables: {
        transactionType: record,
      }
    }).pipe(map(({data}) =>
      (data as any).addTransactionType as ITransactionType,
    ));
  }

  save(record: ITransactionType): Observable<ITransactionType> {
    if (record.id === undefined) {
      return this.create(record);
    }
    return this.update(record);
  }

  update(record: ITransactionType): Observable<ITransactionType> {
    return this.apollo.mutate({
      mutation: gql`mutation updateTransactionType($transactionType: TransactionTypeUpdate){
        updateTransactionType(type: $transactionType) ${FULL_RESPONSE}
      }`,
      variables: {
        transactionType: {
          id: record.id,
          name: record.name,
          description: record.description,
        },
      }
    }).pipe(map(({data}) =>
      (data as any).updateTransactionType as ITransactionType,
    ));
  }
}
