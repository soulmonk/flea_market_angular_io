import {Apollo, gql} from 'apollo-angular';
import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IBank} from '../models/bank';

@Injectable()
export class BankService {

  constructor(private apollo: Apollo) {}

  list(): Observable<IBank[]> {
    return this.apollo.query({
      query: gql`{
        banks {
          id
          name
          url
        }
      }`,
    }).pipe(map(({data}) => {
      return (data as any).banks as IBank[];
    }));
  }

  save(record: IBank): Observable<IBank> {
    if (record.id === undefined) {
      return this.create(record);
    }
    throw new Error('Not implemented');
  }

  create(record: IBank): Observable<IBank> {
    return this.apollo.mutate({
      mutation: gql`mutation createBank($bank: BankCreate) {
        addBank(bank: $bank) {
          id
          name
          url
        }
      }`,
      variables: {
        bank: record,
      }
    }).pipe(map(({data}) =>
      (data as any).addBank as IBank,
    ));
  }
}
