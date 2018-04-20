import * as fromNotes from './note.reducer';
import * as fromRoot from '@app/reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface NotesState {
  notes: fromNotes.State;
}

export const getNotesState = createFeatureSelector<NotesState>('notes');

export const getNotesEntitiesState = createSelector(
  getNotesState,
  state => state.notes,
);

export const {
  selectIds: getNoteIds,
  selectEntities: getNotesEntities,
  selectAll: getAllNotes,
  selectTotal: getTotalNotes,
} = fromNotes.adapter.getSelectors(getNotesEntitiesState);


// export const getNotes = createSelector(
//   getNotesEntities
// );


export const reducers = {
  notes: fromNotes.reducer,
};
