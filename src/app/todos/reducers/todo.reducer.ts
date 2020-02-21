import { TodoActions, TodoActionTypes } from '@app/todos/actions/todo'

export const initialState = {
  items: [],
  filter: 'ALL',
}

export const selectorTodos = state => state.todos

export function todosReducer (state = initialState, action: TodoActions) {
  switch (action.type) {
    case TodoActionTypes.LoadSuccess:
      return Object.assign({}, state, {
        items: action.payload.slice(0),
      })

    case TodoActionTypes.AddSuccess:
      return Object.assign({}, state, {
        items: state.items.concat(action.payload),
      })

    case TodoActionTypes.RemoveSuccess:
      return Object.assign({}, state, {
        items: state.items.filter(todo => todo.id !== action.id),
      })

    case TodoActionTypes.Filter:
      return Object.assign({}, state, {
        filter: action.filter
      })
    default:
      return state
  }
}
