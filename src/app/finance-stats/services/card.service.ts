import {Apollo, gql} from 'apollo-angular';
import {Injectable} from '@angular/core';


import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ICard} from '../models/card';

@Injectable()
export class CardService {

  constructor(private apollo: Apollo) {
  }

  list(): Observable<ICard[]> {
    return this.apollo.query({
      query: gql`{
        cards {
          id
          name
          validFrom
          validTo
          description
          currencyCode
          bank {
            name
          }
        }
      }`,
    }).pipe(map(({data}) => {
      return (data as any).cards as ICard[];
    }));
  }
  save(record: ICard): Observable<ICard> {
    if (record.id === undefined) {
      return this.create(record);
    }
    throw new Error('Not implemented');
  }

  create(record: ICard): Observable<ICard> {
    return this.apollo.mutate({
      mutation: gql`mutation createCard($card: CardCreate) {
        addCard(card: $card) {
          id
          name
          bank {
            name
          }
          currencyCode
          validFrom
          validTo
        }
      }`,
      variables: {
        card: record,
      }
    }).pipe(map(({data}) =>
      (data as any).addCard as ICard,
    ));
  }
}
