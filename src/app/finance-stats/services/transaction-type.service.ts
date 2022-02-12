import {Apollo, gql} from 'apollo-angular';
import {Injectable} from '@angular/core';


import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ITransactionType} from '../models/transaction-type';

@Injectable()
export class TransactionTypeService {

  constructor(private apollo: Apollo) {
  }

  list(): Observable<ITransactionType[]> {
    return this.apollo.query({
      query: gql`{
        transactionTypes {
          id
          name
          description
        }
      }`,
    }).pipe(map(({data}) => {
      return (data as any).transactionTypes as ITransactionType[];
    }));
  }
}
