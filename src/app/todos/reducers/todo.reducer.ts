import { v4 as uuid } from 'uuid';

import { Action } from '@app/core';
import { ITodo } from '../models/todo';

import { TodoActionTypes } from '@app/todos/actions/todo';

export const initialState = {
  items: [],
  filter: 'ALL'
};

export type TodoFilter = 'ALL' | 'DONE' | 'ACTIVE';

export const TODOS_KEY = 'EXAMPLES.TODOS';
export const TODOS_ADD = 'TODOS_ADD';
export const TODOS_TOGGLE = 'TODOS_TOGGLE';
export const TODOS_REMOVE_DONE = 'TODOS_REMOVE_DONE';
export const TODOS_FILTER = 'TODOS_FILTER';
export const TODOS_PERSIST = 'TODOS_PERSIST';

export const actionRemoveDoneTodos = () => ({ type: TODOS_REMOVE_DONE });
export const actionAddTodo = (name: string): Action => ({
  type: TODOS_ADD,
  payload: name
});
export const actionToggleTodo = (id: string): Action => ({
  type: TODOS_TOGGLE,
  payload: id
});
export const actionPersistTodos = (todos): Action => ({
  type: TODOS_PERSIST,
  payload: todos
});
export const actionFilterTodos = (filter: TodoFilter): Action => ({
  type: TODOS_FILTER,
  payload: filter
});

export const selectorTodos = state => state.todos;

export function todosReducer(state = initialState, action: Action) {
  switch (action.type) {
    case TodoActionTypes.LoadSuccess:
      return Object.assign({}, state, {
        items: action.payload.slice(0)
      });

    case TodoActionTypes.AddTodoSuccess:
      return Object.assign({}, state, {
        items: state.items.concat(action.payload)
      });

    case TODOS_TOGGLE:
      const items = state.items.map((item: ITodo) => {
        if (item._id === action.payload) {
          return Object.assign({}, item, {done: !item.done});
        }
        return item;
      });

      return Object.assign({}, state, {
        items
      });

    case TODOS_REMOVE_DONE:
      return Object.assign({}, state, {
        items: state.items.filter((item: ITodo) => !item.done)
      });

    case TODOS_FILTER:
      return Object.assign({}, state, { filter: action.payload });

    default:
      return state;
  }
}
