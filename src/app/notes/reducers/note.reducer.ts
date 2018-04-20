import {INote} from '@app/notes/models/note';
import {NoteActions, NoteActionsType} from '@app/notes/actions/note.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface State extends EntityState<INote> {

}

export const adapter: EntityAdapter<INote> = createEntityAdapter<INote>({
  selectId: (note: INote) => note.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({});

export function reducer(state = initialState, action: NoteActions) {
  switch (action.type) {
    case NoteActionsType.LoadSuccess:
      return {
        ...adapter.addMany(action.payload, state),
      };
    case NoteActionsType.CreateSuccess:
      return {
        ...adapter.addOne(action.payload, state),
      };
    case NoteActionsType.UpdateSuccess:
      return {
        ...adapter.updateOne(action.payload, state),
      };
    case NoteActionsType.RemoveSuccess:
      return {
        ...adapter.removeOne(action.payload, state),
      };
    default:
      return state;
  }
}
