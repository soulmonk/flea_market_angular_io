import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ITransaction } from '../models/transaction'

@Injectable()
export class TransactionService {
  constructor (private apollo: Apollo) {}

  listFull(): Observable<ITransaction[]> {
    return this.apollo.query({
      query: gql`query listTransactions {
        transactions {
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
      }`
    }).pipe(map(({data}) => {
      return (data as any).transactions as ITransaction[]
    }))
  }
}
