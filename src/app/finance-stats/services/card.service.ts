import {Apollo, gql} from 'apollo-angular';
import { Injectable } from '@angular/core'


import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ICard } from '../models/card'

@Injectable()
export class CardService {

  constructor (private apollo: Apollo) {}

  list (): Observable<ICard[]> {
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
    }).pipe(map(({ data }) => {
      return (data as any).cards as ICard[]
    }))
  }
}
