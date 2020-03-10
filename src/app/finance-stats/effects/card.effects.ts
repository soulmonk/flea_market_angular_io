import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { CardService } from '../services/card.service'
import {
  CardActionsType,
  LoadFail,
  LoadSuccess,
} from '../actions/card.actions'
import { ICard } from '../models/card'
import { catchError, map, switchMap } from 'rxjs/operators'
import { Observable, of } from 'rxjs'

@Injectable()
export class CardEffects {

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType(CardActionsType.Load),
    switchMap(() =>
      this.service.list().pipe(
        map((cards: ICard[]) => new LoadSuccess(cards)),
        catchError(err => of(new LoadFail(err))),
      ),
    ),
  )

  constructor (
    private actions$: Actions,
    private service: CardService) {}
}
